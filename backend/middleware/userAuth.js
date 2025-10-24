import jwt from 'jsonwebtoken';
import userModel from '../models/userModels.js';

const userAuth = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ success: false, message: 'No token, authorization denied' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id;
        // Optionally, fetch user and attach to req.user
        req.user = await userModel.findById(decoded.id).select('-password');
        next();
    } catch (error) {
        return res.status(401).json({ success: false, message: 'Token is not valid' });
    }
};

export default userAuth;
