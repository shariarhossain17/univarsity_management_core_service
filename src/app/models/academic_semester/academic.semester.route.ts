import express from 'express';
import validateRequest from '../../../middlewares/validateRequest';
import { academicSemesterController } from './academic.semester.controller';
import { AcademicSemesterValidation } from './academic.semester.zod.validation';

const academicSemesterRouter = express.Router();

academicSemesterRouter.post(
  '/create',
  validateRequest(AcademicSemesterValidation.create),
  academicSemesterController.insertAcademicSemester
);

export default academicSemesterRouter;
