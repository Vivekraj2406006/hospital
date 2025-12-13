import userModel from '../models/userModels.js';

export const getUser = async (req, res) => {
    try {
        req.user = await userModel.findById(req.userId).select('-password');

        if (!req.user) {
            return res.json({ success: false, message: 'User not found' });
        }
        return res.json({ success: true, user: req.user, message: "User found" });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};

export const deleteUnverifiedUser = (req, res) => {
  const userId = req.userId;

  setTimeout(async () => {
    try {
      const user = await userModel.findById(userId).select('-password').lean();
      if (!user) {
        console.log('No user to delete', userId);
        return;
      }
      if (user.isAccountVerified) {
        console.log('User verified, skipping delete', userId);
        return;
      }
      const deleted = await userModel.findByIdAndDelete(userId);
      if (deleted){
        console.log(`Deleted unverified user ${userId}`)
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
        return res.json({ success: true, message: 'Deletion scheduled' });
      };
    } catch (err) {
      console.error('Error deleting user in scheduled task', err);
    }
  }, 6 * 60 * 1000);
};