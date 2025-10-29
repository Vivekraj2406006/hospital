import express from 'express';
import { getUser, deleteUnverifiedUser } from '../controllers/userController.js';
import userAuth from '../middleware/userAuth.js';

const router = express.Router();

// Protected route to get current user data
router.get('/get-user', userAuth, getUser);
router.post('/delete-unverified-user', userAuth, deleteUnverifiedUser);
export default router;
