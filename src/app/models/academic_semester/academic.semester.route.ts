import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../../middlewares/auth';
import validateRequest from '../../../middlewares/validateRequest';
import { academicSemesterController } from './academic.semester.controller';
import { AcademicSemesterValidation } from './academic.semester.zod.validation';

const academicSemesterRouter = express.Router();

academicSemesterRouter.post(
  '/',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
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
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  validateRequest(AcademicSemesterValidation.update),
  academicSemesterController.updateAcademicSemester
);
academicSemesterRouter.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  academicSemesterController.deleteAcademicSemester
);

export default academicSemesterRouter;
