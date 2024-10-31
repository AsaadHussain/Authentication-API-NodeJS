
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true                                    //a schema for a users record in DB
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    tc: {
        type: Boolean,
        required: true
    },
});

const userModel = mongoose.model("user", userSchema);           //creating a model for that schema

export default userModel;