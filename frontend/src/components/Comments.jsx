import React from 'react'
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../auth/AuthContext';
import { useEffect } from 'react';
import { useState } from 'react';
import { createComment, deleteComment, getCommentsByUsers, updateComment } from '../utils/links';
import { Link, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

const Comments = () => {

    const { user } = useContext(AuthContext);
    const { id } = useParams();
    const [comments, setComments] = useState([]);
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [updatedComment, setUpdatedComment] = useState("");

    const getComments = async () => {
        try {
            const res = await axios.get(`${getCommentsByUsers}/${id}`, { withCredentials: true });
            setComments(res.data.comments);
        } catch (error) {
            
        }
    }

    const handleCommentDelete = async (id) => {
        try {
            await axios.delete(`${deleteComment}/${id}`, {
                withCredentials: true
            });
            getComments();
            toast.success("Comment deleted");
        } catch (error) {
            toast.error(error.response?.data?.message || " Failed to delete comment");
        }
    }

    const handleAddComment = async () => {
        try {
            const content = document.querySelector("textarea[name='comment']").value;
            const userId = user._id;
            const issueId = id;
            const userName = user.name;
            await axios.post(`${createComment}`, {
                content,
                userId,
                issueId,
                userName
            }, { withCredentials: true });

            getComments();
            document.querySelector("textarea[name='comment']").value = "";
            toast.success("Comment added");
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to add comment");
        }
    }

    const handleUpdateComment = async (id) => {
        const commentId = id;
        const newContent = updatedComment;
        try {
            await axios.patch(`${updateComment}`, {
                commentId,
                newContent
            }, { withCredentials: true });
            setUpdatedComment("");
            getComments();
            toast.success("Comment updated");
            setEditingCommentId(null);
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to update comment");
        }
    }

    useEffect(() => {
        getComments();
    }, [id]);

    return (
        <div className="border-t border-gray-200 p-6 lg:p-8">
            <h3 className='text-2xl font-bold text-gray-900 mb-4'>Discussion</h3>

            {user ? (
                <div className="mb-6">
                    <textarea
                        name="comment"
                        rows={4}
                        placeholder='Share your thoughts, questions, or suggestions...'
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    ></textarea>
                    <button
                        onClick={handleAddComment}
                        className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 cursor-pointer rounded-lg transition-colors duration-200">
                        Post Comment
                    </button>
                </div>
            ) : (
                <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-blue-700 text-sm">Please <Link to="/login" className="font-semibold hover:underline">log in</Link> to comment</p>
                </div>
            )}

            {/* Comments List */}
            <div className="space-y-4">
                {comments.length > 0 ? (
                    comments.map((comment) => (
                        <div key={comment._id} className="bg-gray-50 text-md rounded-lg p-4 border border-gray-200 hover:border-gray-300 transition-colors">
                            <div className="flex justify-between items-start mb-2">
                                <h4 className="font-semibold text-lg text-gray-900">{comment.userName}</h4>
                                <span className="text-md text-gray-500">{new Date(comment.createdAt).toLocaleDateString()}</span>
                            </div>

                            {editingCommentId === comment._id ? (
                                <div className='space-y-2'>
                                    <textarea
                                        name="newcomment"
                                        rows={3}
                                        value={updatedComment}
                                        onChange={(e) => setUpdatedComment(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                                    />
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleUpdateComment(comment._id)}
                                            className="flex-1 bg-green-600 hover:bg-green-700 text-white py-1 px-3 rounded text-sm font-medium transition-colors"
                                        >
                                            Save
                                        </button>
                                        <button
                                            onClick={() => setEditingCommentId(null)}
                                            className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 py-1 px-3 rounded text-sm font-medium transition-colors"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <p className="text-gray-800 text-md mb-3">{comment.content}</p>
                                    {user && user._id === comment.commentedBy && (
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => { setEditingCommentId(comment._id); setUpdatedComment(comment.content); }}
                                                className="text-sm bg-blue-100 text-blue-700 hover:bg-blue-200 py-1 px-2 rounded transition-colors"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleCommentDelete(comment._id)}
                                                className="text-sm bg-red-100 text-red-700 hover:bg-red-200 py-1 px-2 rounded transition-colors"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    ))
                ) : (
                    <p className="text-center text-md text-gray-500 py-8">No comments yet. Be the first to share your thoughts!</p>
                )}
            </div>
        </div>
    )
}

export default Comments
