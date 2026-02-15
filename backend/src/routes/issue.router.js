import express from "express";
import { fetchAllIssue, fetchIssue, solveIssue } from "../controllers/issue.controller.js";

const issuesRouter = express.Router();

issuesRouter.post('/issue/solve', solveIssue);
issuesRouter.get('/issue/fetch', fetchAllIssue);
issuesRouter.get('/issue/:id', fetchIssue);

export default issuesRouter;