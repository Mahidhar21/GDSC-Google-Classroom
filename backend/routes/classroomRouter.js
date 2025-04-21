import express from 'express';
import {handleCreateClassroom, handleGetClassroom,handleJoinClassroom,handleGetClasswork,handleGetClassroomPeople} from '../controllers/classroomController.js';

const classroomRouter=new express.Router();

//Routes to create,join Classroom.

classroomRouter.post('/create',handleCreateClassroom);
classroomRouter.post('/join',handleJoinClassroom);

//Routes to view Classroom (After opening a particular classroom).

classroomRouter.get('/c/:id',handleGetClassroom);

//view classroom work page.

classroomRouter.get('/w/:id',handleGetClasswork);

//view classroom people.

classroomRouter.get('/p/:id',handleGetClassroomPeople);


export default classroomRouter;