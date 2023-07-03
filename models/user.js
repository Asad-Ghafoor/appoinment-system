const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    image: String,
    name: {
        type: String,
        required: [true, "name is required"]
    },
    email: {
        type: String,
        required: [true, "email is required"]
    },
    password: {
        type: String,
        required: [true, "password is required"]
    },
    contactNumber: {
        type: String,
        required: [true, "contactNumber is required"]
    },
    userType: {
        type: String,
        required: [true, "type is required"],
        enum: ["Doctor", "Patient", "admin", "super-admin"]
    },
    status: {
        type: Number,
        default: 1
    },
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);
module.exports = User;