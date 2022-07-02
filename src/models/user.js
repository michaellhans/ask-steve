import mongoose from "mongoose";

// Create schema for user
const UserSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    birthDate: {
        type: Date,
        required: true,
    },
    state: {
        type: Number,
        required: true,
    }
})

const User = mongoose.model(
    "User",
    UserSchema
);

export default User;