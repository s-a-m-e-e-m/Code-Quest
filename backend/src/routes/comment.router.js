import express from 'express';
import { createComment, deleteComment, getCommentsByIssueId, updateComment } from '../controllers/comment.controller.js';

const commentRouter = express.Router();

commentRouter.post('/create', createComment);
commentRouter.patch('/update', updateComment);
commentRouter.delete('/delete/:id', deleteComment);
commentRouter.get('/:issueId', getCommentsByIssueId);

export default commentRouter