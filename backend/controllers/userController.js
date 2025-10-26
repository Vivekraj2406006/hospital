import userModel from '../models/userModels.js';

export const getUser = async (req, res) => {
    try {
        // userAuth middleware attaches req.user when token is valid
        if (!req.user) {
            return res.json({ success: false, message: 'User not found' });
        }
        return res.json({ success: true, user: req.user });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};
