import {model,Schema} from mongoose;


const userSchema=new Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    profileImage:{type:String,default:'',required:true},//setup for the default clodinary url is to be done.
    role: { type: String, enum: ['teacher', 'student'], default: 'student' }
})

const User=model('User',userSchema)||mongoose.model.User;
export default User;