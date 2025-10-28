import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import userModel from '../models/userModels.js';
import transporter from '../config/nodemailer.js';
import { EMAIL_VERIFY_TEMPLATE, PASSWORD_RESET_TEMPLATE } from '../config/emailTemplate.js';
import { isConnected as isDbConnected } from '../config/mongodb.js';
import fetch from 'node-fetch';

export const testEmail = async (req, res) => {
    try {
        const testMailOptions = {
            from: process.env.SENDER_EMAIL,
            to: process.env.SENDER_EMAIL,
            subject: "Email Configuration Test",
            text: "If you receive this email, your email configuration is working correctly!"
        };
        await transporter.sendMail(testMailOptions);
        res.json({ success: true, message: "Test email sent successfully" });
    } catch (error) {
        res.json({ success: false, message: `Email configuration error: ${error.message}` });
    }
};

// Google OAuth redirect (start flow)
export const googleAuthRedirect = async (req, res) => {
    try {
        const { GOOGLE_CLIENT_ID, GOOGLE_REDIRECT_URI } = process.env;
        if (!GOOGLE_CLIENT_ID || !GOOGLE_REDIRECT_URI) {
            return res.status(500).json({ success: false, message: 'Missing Google OAuth env vars' });
        }
        const popup = req.query.popup === '1';
        const action = req.query.action || 'login'; // 'signup' or 'login'
        // encode both popup flag and action into state so it round-trips through Google
        const state = `${popup ? 'popup' : 'normal'}|${action}`;
        const params = new URLSearchParams({
            client_id: GOOGLE_CLIENT_ID,
            redirect_uri: GOOGLE_REDIRECT_URI,
            response_type: 'code',
            scope: 'openid email profile',
            access_type: 'offline',
            prompt: 'select_account',
            state
        });
        const url = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
        return res.redirect(url);
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Google OAuth callback (exchange code, create/find user, set cookie)
export const googleAuthCallback = async (req, res) => {
    try {
        const code = req.query.code;
        const rawState = req.query.state || '';
        if (!code) return res.status(400).send('Missing code');
        const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URI, FRONTEND_URL } = process.env;
        if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET || !GOOGLE_REDIRECT_URI) {
            return res.status(500).send('Missing Google OAuth configuration');
        }
        // parse state which may be like 'popup|signup' or 'normal|login'
        let flow = 'normal';
        let action = 'login';
        if (rawState.includes('|')) {
            const parts = rawState.split('|');
            flow = parts[0] || 'normal';
            action = parts[1] || 'login';
        } else {
            flow = rawState || 'normal';
            action = req.query.action || 'login';
        }

        // Exchange code for tokens
        const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
                code,
                client_id: GOOGLE_CLIENT_ID,
                client_secret: GOOGLE_CLIENT_SECRET,
                redirect_uri: GOOGLE_REDIRECT_URI,
                grant_type: 'authorization_code'
            })
        });
        const tokenData = await tokenRes.json();
        if (!tokenData.id_token) {
            return res.status(400).send('Failed to obtain id_token');
        }

        // Verify id_token
        const verifyRes = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${tokenData.id_token}`);
        const profile = await verifyRes.json();
        const email = profile.email;
        const name = profile.name || profile.email.split('@')[0];

        // Create or find user, but enforce verification rules depending on action
        let user = null;
        if (isDbConnected) {
            user = await userModel.findOne({ email });
            if (!user) {
                if (action === 'signup') {
                    // create UN-verified user when signing up via Google and send OTP for verification
                    const randomPassword = Math.random().toString(36).slice(-8) + Date.now();
                    const hashed = await bcrypt.hash(randomPassword, 10);
                    const otp = String(Math.floor(100000 + Math.random() * 900000));
                    user = new userModel({ name, email, password: hashed, isAccountVerified: false, verifyOtp: otp, verifyOtpExpireAt: Date.now() + 24 * 60 * 60 * 1000 });
                    await user.save();
                    // Send verification OTP email if SMTP configured
                    try {
                        const htmlContent = EMAIL_VERIFY_TEMPLATE.replace('{{otp}}', otp).replace('${otp}', otp).replace('{{email}}', user.email);
                        const mailOptions = {
                            from: process.env.SENDER_EMAIL,
                            to: user.email,
                            subject: "Account verification OTP",
                            html: htmlContent,
                            text: `Your OTP for verifying your email is: ${otp}\nThis OTP is valid for 24 hours. Please do not share it with anyone.`
                        };
                        await transporter.sendMail(mailOptions);
                    } catch (emailError) {
                        console.error('Failed to send OTP email for Google signup', emailError);
                    }
                } else {
                    // login attempt but no user exists
                    // respond with popup message instructing to sign up
                    if (flow === 'popup') {
                        const origin = process.env.NODE_ENV === 'production' ? (FRONTEND_URL || '') : (FRONTEND_URL || '*');
                        return res.send(`<!doctype html><html><body><script>window.opener.postMessage({success:false,message:'User not found. Please sign up first.'}, '${origin}');window.close();</script></body></html>`);
                    }
                    return res.redirect(FRONTEND_URL || '/');
                }
            } else {
                // user exists
                if (action === 'login') {
                    if (!user.isAccountVerified) {
                        if (flow === 'popup') {
                            const origin = process.env.NODE_ENV === 'production' ? (FRONTEND_URL || '') : (FRONTEND_URL || '*');
                            return res.send(`<!doctype html><html><body><script>window.opener.postMessage({success:false,message:'Please verify your email before logging in.'}, '${origin}');window.close();</script></body></html>`);
                        }
                        return res.redirect(FRONTEND_URL || '/');
                    }
                    // else proceed to sign-in
                }
                // for signup action when user already exists, just sign them in
            }
        }

        // Sign server JWT and set cookie (user should now be present)
        const token = jwt.sign({ id: user ? user._id : `mock_${Date.now()}`, email }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        // If popup flow, return HTML that posts message to opener and closes
        if (flow === 'popup') {
            // In development allow any origin so postMessage isn't blocked by port mismatches
            // In production require FRONTEND_URL to be set for security
            let origin = '*';
            if (process.env.NODE_ENV === 'production') {
                if (!FRONTEND_URL) return res.status(500).send('Missing FRONTEND_URL');
                origin = FRONTEND_URL;
            } else {
                origin = FRONTEND_URL || '*';
            }
            // If this was a signup flow, user still needs to verify via OTP — notify opener
            if (action === 'signup') {
                return res.send(`<!doctype html><html><body><script>window.opener.postMessage({success:false,message:'Account created. An OTP has been sent to your email for verification.'}, '${origin}');window.close();</script></body></html>`);
            }
            return res.send(`<!doctype html><html><body><script>window.opener.postMessage({success:true}, '${origin}');window.close();</script></body></html>`);
        }

        // Otherwise redirect to frontend
        if (action === 'signup') {
            // append a query param so frontend can auto-start the resend timer
            if (FRONTEND_URL) {
                return res.redirect(`${FRONTEND_URL.replace(/\/$/, '')}/verify-email?from=google`);
            }
            return res.redirect('/verify-email?from=google');
        }
        return res.redirect(FRONTEND_URL || '/');
    } catch (error) {
        console.error('googleAuthCallback error', error);
        return res.status(500).send('OAuth callback error');
    }
};

// Endpoint for client to POST id_token (if using Firebase client-side)
export const googleAuthPost = async (req, res) => {
    try {
        const { id_token, action } = req.body; // action: 'signup' or 'login'
        if (!id_token) return res.json({ success: false, message: 'Missing id_token' });
        const verifyRes = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${id_token}`);
        const profile = await verifyRes.json();
        if (!profile || !profile.email) return res.json({ success: false, message: 'Invalid id_token' });
        const email = profile.email;
        const name = profile.name || email.split('@')[0];

        let user = null;
        if (isDbConnected) {
            user = await userModel.findOne({ email });
            if (!user) {
                if (action === 'signup') {
                    // create UN-verified user and send OTP
                    const randomPassword = Math.random().toString(36).slice(-8) + Date.now();
                    const hashed = await bcrypt.hash(randomPassword, 10);
                    const otp = String(Math.floor(100000 + Math.random() * 900000));
                    user = new userModel({ name, email, password: hashed, isAccountVerified: false, verifyOtp: otp, verifyOtpExpireAt: Date.now() + 24 * 60 * 60 * 1000 });
                    await user.save();
                    try {
                        const htmlContent = EMAIL_VERIFY_TEMPLATE.replace('{{otp}}', otp).replace('${otp}', otp).replace('{{email}}', user.email);
                        const mailOptions = {
                            from: process.env.SENDER_EMAIL,
                            to: user.email,
                            subject: "Account verification OTP",
                            html: htmlContent,
                            text: `Your OTP for verifying your email is: ${otp}\nThis OTP is valid for 24 hours. Please do not share it with anyone.`
                        };
                        await transporter.sendMail(mailOptions);
                    } catch (emailError) {
                        console.error('Failed to send OTP email for Google signup (POST)', emailError);
                    }
                } else {
                    return res.json({ success: false, message: 'User not found. Please sign up first.' });
                }
            } else {
                if (action === 'login' && !user.isAccountVerified) {
                    return res.json({ success: false, message: 'Please verify your email before logging in.' });
                }
            }
        }
        const token = jwt.sign({ id: user ? user._id : `mock_${Date.now()}`, email }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
        // If this was a signup flow, instruct client to verify via OTP
        if (action === 'signup') {
            return res.json({ success: false, message: 'Account created. OTP sent to email for verification.' });
        }
        return res.json({ success: true });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};

export const register = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.json({ success: false, message: 'Missing Details' });
    }
    try {
        // If DB is not connected, allow a mock registration so developers can test flows.
        if (!isDbConnected) {
            // const mockId = `mock_${Date.now()}`;
            // const token = jwt.sign({ id: mockId, email }, process.env.JWT_SECRET, { expiresIn: '7d' });
            // res.cookie('token', token, {
            //     httpOnly: true,
            //     secure: process.env.NODE_ENV === 'production',
            //     sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            //     maxAge: 7 * 24 * 60 * 60 * 1000
            // });
            // return res.json({ success: true, message: 'Registered (mock)' });
            return res.json({success: false, message: "Something is wrong on our end. Please try again later."});
        }

        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.json({ success: false, message: 'User already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new userModel({ name, email, password: hashedPassword });
        await user.save();
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
        // Send welcome email
        if (process.env.SMTP_USER && process.env.SMTP_PASS) {
            const mailOptions = {
                from: process.env.SENDER_EMAIL,
                to: email,
                subject: "Welcome to SR EMERGENCY!",
                text: `Your account has been created with email: ${email}. But you are not verified yet.`
            };
            try {
                await transporter.sendMail(mailOptions);
            } catch (emailError) {
                // Don't fail registration if email fails
            }
        }
        res.json({ success: true });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.json({ success: false, message: 'Email and Password are required' });
    }
    try {
        // If DB is not connected, allow any login (useful for local dev/demo)
        if (!isDbConnected) {
            // const mockId = `mock_${Date.now()}`;
            // const token = jwt.sign({ id: mockId, email }, process.env.JWT_SECRET, { expiresIn: '7d' });
            // res.cookie('token', token, {
            //     httpOnly: true,
            //     secure: process.env.NODE_ENV === 'production',
            //     sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            //     maxAge: 7 * 24 * 60 * 60 * 1000
            // });
            // return res.json({ success: true, message: 'Logged in (mock)' });
            return res.json({success: false, message: "Something went wrong on our end. Please try again later."});

        }

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "Invalid Email" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ success: false, message: "Invalid password" });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
        res.json({ success: true, user: user });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

export const logout = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
        res.json({ success: true, message: "Logged Out" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

export const sendVerifyOtp = async (req, res) => {
    try {
        const userId = req.userId;
        if (!userId) {
            return res.json({ success: false, message: 'UserID not possible' });
        }
        const user = await userModel.findById(userId).select('-password');
        if (!user) {
            return res.json({ success: false, message: 'User not found' });
        }
        if (user.isAccountVerified) {
            return res.json({ success: false, message: 'Account already verified' });
        }
        const otp = String(Math.floor(100000 + Math.random() * 900000));
        user.verifyOtp = otp;
        user.verifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000;
        await user.save();
        const htmlContent = EMAIL_VERIFY_TEMPLATE.replace('{{otp}}', otp).replace('${otp}', otp).replace('{{email}}', user.email);
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: "Account verification OTP",
            html: htmlContent,
            text: `Your OTP for verifying your email is: ${otp}\nThis OTP is valid for 24 hours. Please do not share it with anyone.`
        };
        try {
            await transporter.sendMail(mailOptions);
            res.json({ success: true, message: "Verification OTP sent on email" });
        } catch (emailError) {
            res.json({ success: false, message: "Failed to send verification email" });
        }
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

export const verifyEmail = async (req, res) => {
    try {
        const { otp } = req.body;
        const userId = req.userId;
        if (!userId || !otp) {
            return res.json({ success: false, message: 'Missing Details' });
        }
        const user = await userModel.findById(userId);
        if (!user) {
            return res.json({ success: false, message: 'User not found' });
        }
        if (user.verifyOtpExpireAt < Date.now()) {
            return res.json({ success: false, message: 'OTP expired' });
        }
        if (user.verifyOtp === '' || user.verifyOtp !== otp) {
            return res.json({ success: false, message: 'Invalid OTP' });
        }
        user.isAccountVerified = true;
        user.verifyOtp = '';
        user.verifyOtpExpireAt = 0;
        await user.save();
        return res.json({ success: true, message: 'Email Verified Successfully' });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};

export const isAuthenticated = async (req, res) => {
    try {
        req.user = await userModel.findById(decoded.id).select('-password');

        if(req.user.isAccountVerified) return res.json({ success: true });
        else return res.json({ success: false })
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

export const sendResetOtp = async (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.json({ success: false, message: 'Email is required' });
    }
    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: 'User not found' });
        }
        const otp = String(Math.floor(100000 + Math.random() * 900000));
        user.resetOtp = otp;
        user.resetOtpExpireAt = Date.now() + 15 * 60 * 1000;
        await user.save();
        const htmlContent = PASSWORD_RESET_TEMPLATE.replace('{{otp}}', otp).replace('${otp}', otp).replace('{{email}}', user.email);
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: "Password Reset OTP",
            html: htmlContent,
            text: `Your OTP for resetting your password is: ${otp}\nThis OTP is valid for 15 minutes. Please do not share it with anyone.`
        };
        try {
            await transporter.sendMail(mailOptions);
            return res.json({ success: true, message: "Reset OTP sent on email" });
        } catch (emailError) {
            return res.json({ success: false, message: "Failed to send password reset email" });
        }
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

export const resetPassword = async (req, res) => {
    const { email, otp, newPassword } = req.body;
    if (!email || !otp || !newPassword) {
        return res.json({ success: false, message: 'Require email, otp and newPassword' });
    }
    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: 'User not found' });
        }
        if (user.resetOtpExpireAt < Date.now()) {
            return res.json({ success: false, message: 'OTP expired' });
        }
        if (user.resetOtp === '' || user.resetOtp !== otp) {
            return res.json({ success: false, message: 'Invalid OTP' });
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        user.resetOtp = '';
        user.resetOtpExpireAt = 0;
        await user.save();
        return res.json({ success: true, message: 'Password reset successfully' });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};
