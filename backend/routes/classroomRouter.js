import express from 'express';
import {handleGetAllClassrooms,handleCreateClassroom, handleGetClassroom,handleJoinClassroom, handleAnnouncement} from '../controllers/classroomController.js';

const classroomRouter=new express.Router();

//Routes to get all classrooms user is in.

classroomRouter.get('/',handleGetAllClassrooms);

//Routes to create,join Classroom.

classroomRouter.post('/create',handleCreateClassroom);
classroomRouter.post('/join',handleJoinClassroom);

//Routes to view Classroom (After opening a particular classroom).

classroomRouter.get('/c/:id',handleGetClassroom);

//Handling the making of announcements in the classrooms (individually)
classroomRouter.post('/c/stream/:id',handleAnnouncement);



export default classroomRouter;