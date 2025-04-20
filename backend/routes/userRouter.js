import express from 'express';
import { handleUserLogin,handleUserSignup, handleUserRedirect,handleUserCallback } from '../controllers/userController.js';


const userRouter=express.Router();

userRouter.post('/login',handleUserLogin);
userRouter.post('/signup',handleUserSignup);

userRouter.get('/auth/google',handleUserRedirect);
userRouter.get('/auth/google/callback',handleUserCallback);
export default userRouter;