import express from 'express';
import { academicSemesterController } from './academic.semester.controller';

const academicSemesterRouter = express.Router();

academicSemesterRouter.post(
  '/create',
  academicSemesterController.insertAcademicSemester
);

export default academicSemesterRouter;
