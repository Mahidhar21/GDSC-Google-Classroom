import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app=new express();
const PORT=process.env.PORT;//For now set to 4000

app.get('/',(req,res)=>{
    return res.send("API working");
})

app.listen(PORT,()=>{
    console.log(`Server connected at Port: ${PORT}`)
})