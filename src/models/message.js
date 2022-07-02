import mongoose from "mongoose";

// Create schema for message
const MessageSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
    user: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
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