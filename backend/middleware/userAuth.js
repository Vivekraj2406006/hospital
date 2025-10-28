import jwt from 'jsonwebtoken';
import userModel from '../models/userModels.js';

const userAuth = async (req, res, next) => {
    try {
        const session = req.session;
        if (!session) {
            return res.status(401).json({ success: false, message: 'No session detected, authorization denied' });
        }
        req.userId = session.user._id;
        next();
    } catch (error) {
        return res.status(401).json({ success: false, message: 'Token is not valid' });
    }
};

export default userAuth;
