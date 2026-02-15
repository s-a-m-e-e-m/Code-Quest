import mongoose from "mongoose";

const issueSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ['Syntax', 'Logic', 'UI', 'Link', 'Doc', 'React'],
        required: true
    },
    description: {
        type: String,
        required: true
    },
    buggyCode: {
        type: String,
        required: true
    },
    expectedOutput: {
        type: String,
        required: true
    },
    rewards: {
        coins: {
            type: Number,
            default: 10
        },
        xp: {
            type: Number,
            default: 50
        }
    },

    status: {
        type: String,
        enum: ['Unsolved', 'Solved'],
        default: 'Unsolved'
    },

    solvedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null
    },

    solvedAt: {
        type: Date
    }
}, { timestamps: true })

const Issue = mongoose.model("Issue", issueSchema);
export default Issue