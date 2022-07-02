import mongoose from "mongoose";

// Create schema for message
const MessageSchema = new mongoose.Schema({
    user: {
        type: Number,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    timestamp: {
        type: Date,
        required: true
    }
})

const Message = mongoose.model(
    "Message",
    MessageSchema
);

export default Message;