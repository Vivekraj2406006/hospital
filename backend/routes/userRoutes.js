import express from 'express';
import { getUser } from '../controllers/userController.js';
import userAuth from '../middleware/userAuth.js';

const router = express.Router();

// Protected route to get current user data
router.get('/get-user', userAuth, getUser);

export default router;
