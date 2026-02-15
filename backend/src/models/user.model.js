import mongoose, { Mongoose } from "mongoose";

const userModel = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: [6, 'password must be atleast 6 characters long']
    },
    profilePic: {
        type: String,
        default: "https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1095249842.jpg"
    },
    streak: {
        type: Number,
        default: 0
    },
    coins: {
        type: Number,
        default: 0
    },
    level: {
        type: Number,
        default: 1
    },
    xp: {
        type: Number,
        default: 0
    },
    bountiesClaimed: {
        type: Number,
        default: 0
    },
    lastActivityDate: {
        type: Date
    },
    completedProblems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Issue'
    }],
    assets: {
        type: Array,
        default: []
    },
    description: {
        type: String,
        default: ""
    }
}, { timestamps: true });

const User = mongoose.model("User", userModel);
export default User;