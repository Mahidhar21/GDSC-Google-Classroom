import express from 'express';
import {handleGetAllClassrooms,handleCreateClassroom, handleGetClassroom,handleJoinClassroom,handleGetClasswork,handleGetClassroomPeople} from '../controllers/classroomController.js';

const classroomRouter=new express.Router();

//Routes to get all classrooms user is in.

classroomRouter.get('/',handleGetAllClassrooms);



//Routes to create,join Classroom.

classroomRouter.post('/create',handleCreateClassroom);
classroomRouter.post('/join',handleJoinClassroom);

//Routes to view Classroom (After opening a particular classroom).

classroomRouter.get('/c/:id',handleGetClassroom);




export default classroomRouter;