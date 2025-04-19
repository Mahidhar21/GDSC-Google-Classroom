import express from 'express';
import { handleUserLogin,handleUserSignup } from '../controllers/userController.js';


const userRouter=express.Router();

userRouter.post('/api/user/login',handleUserLogin);
userRouter.post('/api/user/signup',handleUserSignup);

export default userRouter;