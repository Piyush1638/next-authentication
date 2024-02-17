const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide an username."],
        unique: true,
    },
    email: {
        type: String,
        required: [true, "Please provide an email."],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please provide a password."],
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    forgotPasswordToken : String,
    forgotPasswordTokenExpiry : Date,
    verifyToken : String,
    verifyTokenExpiry: Date,
    bio:{
        type: String,
        default: ""
    },
    savedPosts: {
        type: [{
            pid: String,
            type: String
        }],
        default: []
    },
    myPosts: {
        type: [{
            pid: String,
            type: String
        }],
        default: []
    },
    reputation: {
        type: Number,
        default: 0
    }
});


const User = mongoose.models.users || mongoose.model('users', userSchema);

module.exports = User;