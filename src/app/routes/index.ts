import express from 'express';
import academicSemesterRouter from '../models/academic_semester/academic.semester.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/academic_semester',
    route: academicSemesterRouter,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
