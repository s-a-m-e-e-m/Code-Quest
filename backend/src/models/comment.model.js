import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    commentedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    time: {
        type: Date,
        default: Date.now()
    },
    commentedOn: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Issue",
        required: true
    }
}, { timestamps: true });

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;