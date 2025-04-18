import express from 'express';
import dotenv from 'dotenv';
import connectDb from './config/mongoDbConfig';
dotenv.config();



const app=new express();
const PORT=process.env.PORT;//For now set to 4000


//Connection to database
connectDb();

//API endpoints
app.get('/',(req,res)=>{
    return res.send("API working");
})


//Main server connection
app.listen(PORT,()=>{
    console.log(`Server connected at Port: ${PORT}`)
})