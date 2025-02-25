import mongoose from "mongoose";

export const connectDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected successfully!");
    } catch (e) {
        console.error("MongoDB connection failed!", e.message);
        process.exit(1);
    }
};
