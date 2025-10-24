import mongoose from "mongoose";

const connectDB = async () => {
    if (!process.env.MONGODB_URI) {
        console.error("Database connection error: MONGODB_URI is not defined in your .env file.");
        process.exit(1);
    }
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Database connection error:", error.message);
        process.exit(1);
    }
};

export default connectDB;
