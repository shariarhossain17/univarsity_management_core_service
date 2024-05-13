import express from 'express';
import validateRequest from '../../../middlewares/validateRequest';
import { academicSemesterController } from './academic.semester.controller';
import { AcademicSemesterValidation } from './academic.semester.zod.validation';

const academicSemesterRouter = express.Router();

academicSemesterRouter.post(
  '/',
  validateRequest(AcademicSemesterValidation.create),
  academicSemesterController.insertAcademicSemester
);

academicSemesterRouter.get('/', academicSemesterController.getAcademicSemester);
academicSemesterRouter.get(
  '/:id',
  academicSemesterController.getSingleSemester
);

export default academicSemesterRouter;
