import mongoose from "mongoose";


const userSchema=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    profileImage:{type:String,default:'/new',required:true},//setup for the default clodinary url is to be done.
    // role: { type: String, enum: ['teacher', 'student'], default: 'student' }
})

const User=mongoose.models.User || mongoose.model('User',userSchema);
export default User;