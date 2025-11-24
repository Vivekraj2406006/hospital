import bcrypt from 'bcryptjs';
import userModel from '../models/userModels.js';
import { isConnected as isDbConnected } from '../config/mongodb.js';
import fetch from 'node-fetch';
import axios from 'axios';

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
            state: state
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

        // Create or find user
        let user = null;
        if (isDbConnected) {
            user = await userModel.findOne({ email });
            if (!user) {
                if (action === 'login') {
                    // User tries to login but does not exist
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
                        return res.send(`<!doctype html><html><body><script>window.opener.postMessage({success:false, message: "User not found. Please sign up first."}, '${origin}');window.close();</script></body></html>`);
                    }
                    return res.redirect(`${FRONTEND_URL || '/'}?error=user_not_found`);
                }

                // Create new user, verified by default since it's Google
                const randomPassword = Math.random().toString(36).slice(-8) + Date.now();
                const hashed = await bcrypt.hash(randomPassword, 10);
                user = new userModel({ name, email, password: hashed, isAccountVerified: true });
                await user.save();
            } else {
                // Ensure existing user is verified if they login with Google
                if (!user.isAccountVerified) {
                    user.isAccountVerified = true;
                    await user.save();
                }
            }
        }

        req.session.user = user;

        // Check if this is the specific admin email
        const ADMIN_EMAIL = process.env.ADMIN_EMAIL ;
        if (email === ADMIN_EMAIL) {
            req.session.isAdmin = true;
            // Set admin session to expire in 1 hour for security
            if (req.session.cookie) {
                req.session.cookie.maxAge = 60 * 60 * 1000;
            }
        } else {
            // Ensure admin privileges are not carried over from a previous session unless explicitly handled
            req.session.isAdmin = false;
        }

        // Build a safe user object and JSON-encode it (escape '<' to avoid XSS)
        const safeUser = user && user.toObject ? { ...user.toObject() } : user || null;
        if (safeUser) delete safeUser.password;
        const userJson = JSON.stringify(safeUser).replace(/</g, '\\u003c');

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

            return res.send(`<!doctype html><html><body><script>window.opener.postMessage({success:true, user:${userJson}, message: "Successfully Logged in"}, '${origin}');window.close();</script></body></html>`);
        }

        // Otherwise redirect to frontend
        return res.redirect(FRONTEND_URL || '/');
    } catch (error) {
        console.error('googleAuthCallback error', error);
        return res.status(500).send('OAuth callback error');
    }
};

export const logout = async (req, res) => {
    try {
        let isAdmin = false;
        if(req.session.isAdmin) isAdmin = true;
        if (req.session) {
            await new Promise((resolve) => {
                req.session.destroy((err) => {
                    if (err) console.error('Session destroy error:', err);
                    req.session = null;
                    resolve();
                });
            });
        }
        res.clearCookie('sid', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
        res.json({ success: true, message: "Logged Out", isAdmin: isAdmin});
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

export const isAuthenticated = async (req, res) => {
    try {
        req.user = await userModel.findById(req.userId).select('-password');

        if(req.user.isAccountVerified) return res.json({ success: true });
        else return res.json({ success: false })
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

export const isAdmin = (req, res) => {
  axios.defaults.withCredentials = true;
  if (req.session && req.session.isAdmin) {
    return res.json({ success: true, isAdmin: true });
  }
  return res.json({ success: true, isAdmin: false });
};
