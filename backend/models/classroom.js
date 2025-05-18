import mongoose from 'mongoose';

const classroomSchema=new mongoose.Schema({
    className:{type:String,required:true},
    description:{type:String},
    section:{type:String,required:true},
    subject:{type:String,required:true},
    enrolledStudents:{type:Array},
    shortId:{type:String,required:true},
    teachers:{type:Array,required:true},
    announcements:{type:Array},
},{minimize:false,timestamps:true});

const Classroom=mongoose.models.Classroom||mongoose.model('Classroom',classroomSchema);

export default Classroom;