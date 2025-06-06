import mongoose from "mongoose";


const userSchema=new mongoose.Schema({
    googleId:{type:String, sparse: true },
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String},
    profileImage:{type:String,default:'/new',required:true},//setup for the default clodinary url is to be done.
    enrolledClassrooms:{type:Array},
},{minimize:false});

const User=mongoose.models.User || mongoose.model('User',userSchema);
export default User;