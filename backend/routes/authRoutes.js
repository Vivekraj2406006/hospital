import express from 'express';
import { register, login, logout, sendVerifyOtp, verifyEmail, isAuthenticated, sendResetOtp, resetPassword, testEmail, googleAuthRedirect, googleAuthCallback, googleAuthPost } from '../controllers/authController.js';
import userAuth from '../middleware/userAuth.js';

const authRouter = express.Router();

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/logout', logout);
authRouter.post('/send-verify-otp', userAuth, sendVerifyOtp);
authRouter.post('/verify-account', userAuth, verifyEmail);
authRouter.get('/is-auth', userAuth, isAuthenticated);
authRouter.post('/send-reset-otp', sendResetOtp);
authRouter.post('/reset-password', resetPassword);
authRouter.get('/test-email', testEmail);

// Google OAuth endpoints
authRouter.get('/google', googleAuthRedirect);
authRouter.get('/google/callback', googleAuthCallback);
authRouter.post('/google', googleAuthPost);

export default authRouter;
