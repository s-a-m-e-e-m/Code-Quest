import commentModel from "../models/comment.model.js";

export const createComment = async (req, res) => {
    const { content, userId, issueId, userName } = req.body;

    if(content.length<=0){
        return res.status(400).json({
            message: "You can't post empty comments"
        })
    }

    await commentModel.create({
        content: content,
        commentedBy: userId,
        commentedOn: issueId,
        userName: userName
    });

    return res.status(201).json({
        message: "Comment created successfully",
        comment: {
            content: content,
            commentedBy: userId,
            commentedOn: issueId,
            userName: userName
        }
    });
}

export const updateComment = async (req, res) => {
    const { commentId, newContent } = req.body;

    const updateComment = await commentModel.findByIdAndUpdate(commentId, { content: newContent }, { new: true });

    if(!updateComment){
        return res.status(404).json({
            message: "No such comment found"
        })
    }

    return res.status(200).json({
        message: "Comment updated successfully",
        updateComment
    })
};

export const deleteComment = async (req, res) => {
    const { id } = req.params;

    const comment = await commentModel.findByIdAndDelete(id);

    if(!comment){
        return res.status(404).json({
            message: "No such comment exist"
        })
    }

    return res.status(200).json({
        message: "Comment deleted"
    })
};

export const getCommentsByIssueId = async (req, res) => {
    const { issueId } = req.params;

    const comments = await commentModel.find({ commentedOn: issueId });
    if(!comments){
        return res.status(404).json({
            message: "No comments found for this issue"
        })
    }

    return res.status(200).json({
        message: "All comments for this issue fetched successfully",
        comments: comments
    })
}
