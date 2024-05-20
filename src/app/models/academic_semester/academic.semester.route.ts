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

academicSemesterRouter.patch(
  '/:id',
  validateRequest(AcademicSemesterValidation.update),
  academicSemesterController.updateAcademicSemester
);
academicSemesterRouter.delete(
  '/:id',
  academicSemesterController.deleteAcademicSemester
);

export default academicSemesterRouter;
