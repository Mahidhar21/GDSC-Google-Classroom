import express from 'express';
import { handleUserLogin,handleUserSignup, handleUserRedirect,handleUserCallback } from '../controllers/userController.js';


const userRouter=express.Router();


//Login and signup routes using normal mail and password.
userRouter.post('/login',handleUserLogin);
userRouter.post('/signup',handleUserSignup);

//Login and password using google OAuth 2.0. 
userRouter.get('/auth/google',handleUserRedirect);
userRouter.get('/auth/google/callback',handleUserCallback);
export default userRouter;