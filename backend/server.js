import express from 'express';
import dotenv from 'dotenv';
import connectDb from './config/mongoDbConfig.js';
import userRouter from './routes/userRouter.js';


dotenv.config();



const app=new express();
const PORT=process.env.PORT;//For now set to 4000

//Middlewares

app.use(express.json());


//Connection to database
connectDb();

//API endpoints
app.get('/',(req,res)=>{
    return res.send("API working");
})

app.use(userRouter);


//Main server connection
app.listen(PORT,()=>{
    console.log(`Server connected at Port: ${PORT}`)
})