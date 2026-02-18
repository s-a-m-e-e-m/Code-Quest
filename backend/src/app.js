import express from "express";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.routes.js";
import cors from 'cors';
import utilsRouter from "./routes/utils.routes.js";
import issuesRouter from "./routes/issue.router.js";
import commentRouter from "./routes/comment.router.js";

const app = express();
app.use(cookieParser());

app.use(cors({
    origin: '*',
    credentials: true 
}));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.use('/api/user', userRouter)
app.use('/api/comments', commentRouter)
app.use('/api/utils', utilsRouter)
app.use('/api/problems', issuesRouter)

export default app