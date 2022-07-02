const mongoose = require("mongoose");

// Create schema for user
const User = new mongoose.Schema({
    user: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    state: {
        type: Number,
        required: true,
    }
})

export default User;