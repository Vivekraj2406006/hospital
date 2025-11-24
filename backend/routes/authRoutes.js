import express from 'express';
import { logout, isAuthenticated, googleAuthRedirect, googleAuthCallback, isAdmin } from '../controllers/authController.js';
import userAuth from '../middleware/userAuth.js';

const authRouter = express.Router();

authRouter.post('/logout', logout);
authRouter.get('/is-auth', userAuth, isAuthenticated);
authRouter.get('/isAdmin', isAdmin);

// Google OAuth endpoints
authRouter.get('/google', googleAuthRedirect);
authRouter.get('/google/callback', googleAuthCallback);

export default authRouter;
