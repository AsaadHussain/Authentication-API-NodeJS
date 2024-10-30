
import mongoose from "mongoose";

const connectDB = async (DATABASE_URL) => {
    try {
        const DB_OPTIONS = {
            dbName: "perfumeshop"
        }
        await mongoose.connect(DATABASE_URL, DB_OPTIONS)
        console.log("Connected to database");
    } catch (error) {
        console.log("Connection Failed", error);
    }
};

export default connectDB;