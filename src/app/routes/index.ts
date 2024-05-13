import express from 'express';
import academicFacultyRouter from '../models/academic_faculty/academic.faculty.route';
import academicSemesterRouter from '../models/academic_semester/academic.semester.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/academic-semester',
    route: academicSemesterRouter,
  },
  {
    path: '/academic-faculty',
    route: academicFacultyRouter,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
