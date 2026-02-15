import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        index: true
    },
    otpHash: {
        type: String,
        required: true
    },
    expiresAt: {
        type: Date,
        required: true,
        index: { expires: 0 }
    },
    attempts: {
        type: Number,
        default: 0
    },
    lastSentAt: {
        type: Date,
        default: Date.now(),
    },
});

const Otp = mongoose.model("Otp", otpSchema);
export default Otp