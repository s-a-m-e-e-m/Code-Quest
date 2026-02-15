import express from "express";
import { bountyLeaderBoard, purchaseItem, streakLeaderBoard } from "../controllers/utils.controller.js";
import { getAllAvatars, updateUserAvatar } from "../controllers/avatar.controller.js";

const utilsRouter = express.Router();

utilsRouter.post('/store/buy', purchaseItem);
utilsRouter.get('/leaderboard/bounty', bountyLeaderBoard);
utilsRouter.get('/leaderboard/streak', streakLeaderBoard);
utilsRouter.get('/avatars', getAllAvatars);
utilsRouter.put('/:userId/choose-avatar', updateUserAvatar);

export default utilsRouter;