import express from 'express';
import academicDepartmentRouter from '../models/academicDepartment/academic.department.route';
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
  {
    path: '/academic-department',
    route: academicDepartmentRouter,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
