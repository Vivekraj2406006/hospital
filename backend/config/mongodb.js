import mongoose from "mongoose";

// Export a live flag indicating DB connection status. Other modules can import this
// to decide whether to use the real DB or a fallback.
export let isConnected = false;

const connectDB = async () => {
    if (!process.env.MONGODB_URI) {
        isConnected = false;
        return false;
    }
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            // useNewUrlParser and useUnifiedTopology are default in mongoose v6+
        });
        isConnected = true;
        // console.log("Database connected successfully");
        return true;
    } catch (error) {
        isConnected = false;
        // Do not exit the process; allow the server to start in fallback/mock mode.
        return false;
    }
};

export default connectDB;

