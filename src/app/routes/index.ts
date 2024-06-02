import express from 'express';
import buildingRouter from '../models/ building/builing.route';
import academicDepartmentRouter from '../models/academicDepartment/academic.department.route';
import academicFacultyRouter from '../models/academic_faculty/academic.faculty.route';
import academicSemesterRouter from '../models/academic_semester/academic.semester.route';
import facultyRouter from '../models/faculty/faculty.route';
import studentRouter from '../models/student/student.route';

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
  {
    path: '/student',
    route: studentRouter,
  },
  {
    path: '/faculty',
    route: facultyRouter,
  },

  {
    path: '/building',
    route: buildingRouter,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
