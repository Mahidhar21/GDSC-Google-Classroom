import express from 'express';

const userRouter=express.Router();

userRouter.post('/api/user/login',handleUserLogin);
userRouter.post('/api/user/signup',handleUserSignup);

export default userRouter;