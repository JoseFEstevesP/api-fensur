import courseRoutes from '#Routes/course.routes.js';
import noteRoutes from '#Routes/note.routes.js';
import rolRoutes from '#Routes/rol.routes.js';
import studentRoutes from '#Routes/student.routes.js';
import teacherRoutes from '#Routes/teacher.routes.js';
import userRoutes from '#Routes/user.routes.js';
import cors from 'cors';
import express from 'express';
const expressApp = express();
// middleware
expressApp.use(express.json());
expressApp.use(cors());
// routes
expressApp.use('/user', userRoutes);
expressApp.use('/rol', rolRoutes);
expressApp.use('/course', courseRoutes);
expressApp.use('/teacher', teacherRoutes);
expressApp.use('/student', studentRoutes);
expressApp.use('/note', noteRoutes);
export default expressApp;
