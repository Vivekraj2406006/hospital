import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import userModel from '../models/userModels.js';
import transporter from '../config/nodemailer.js';
import { EMAIL_VERIFY_TEMPLATE, PASSWORD_RESET_TEMPLATE } from '../config/emailTemplate.js';
import { isConnected as isDbConnected } from '../config/mongodb.js';

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
