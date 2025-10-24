import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAccountVerified: { type: Boolean, default: false },
    verifyOtp: { type: String, default: '' },
    verifyOtpExpireAt: { type: Date, default: null },
    resetOtp: { type: String, default: '' },
    resetOtpExpireAt: { type: Date, default: null }
}, { timestamps: true });

const userModel = mongoose.model('user', userSchema);

export default userModel;
