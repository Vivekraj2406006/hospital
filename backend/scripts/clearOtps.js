import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userModel from '../models/userModels.js';

dotenv.config();

const MONGO_URI = process.env.MONGODB_URI || process.env.MONGO_URL;

async function run() {
  if (!MONGO_URI) {
    console.error('Missing MONGODB_URI in environment. Create a .env with MONGODB_URI.');
    process.exit(1);
  }

  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');

    const result = await userModel.updateMany({}, { $set: { verifyOtp: '', verifyOtpExpireAt: 0, resetOtp: '', resetOtpExpireAt: 0 } });
    console.log('OTP fields cleared for users. Matched:', result.matchedCount, 'Modified:', result.modifiedCount);
  } catch (err) {
    console.error('Error clearing OTPs:', err);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

run();
