import express from 'express';
import { editUserDescription, getUser, getUserById, logoutUser, SignIn, SignUp } from '../controllers/user.controller.js';
import { sendOtp, verifyOtp } from '../controllers/otp.controller.js';

const userRouter = express.Router();

userRouter.post('/signup', SignUp);
userRouter.post('/signin', SignIn);
userRouter.delete('/logout', logoutUser);
userRouter.get('/getuser', getUser);
userRouter.get('/:id', getUserById);
userRouter.patch('/update/description/:id', editUserDescription);

userRouter.post('/send/otp', sendOtp);
userRouter.post('/verify/otp', verifyOtp);

export default userRouter