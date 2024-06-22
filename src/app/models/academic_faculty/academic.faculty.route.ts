import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../../middlewares/auth';
import validateRequest from '../../../middlewares/validateRequest';
import { AcademicFacultyValidation } from './acadamic.faculty.zod.validation';
import { academicFacultyController } from './acadmic.faculty.controller';
const academicFacultyRouter = express.Router();

academicFacultyRouter.post(
  '/',
  // auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  validateRequest(AcademicFacultyValidation.createAcademicFaculty),
  academicFacultyController.createAcademicFaculty
);

academicFacultyRouter.get('/', academicFacultyController.getAllAcademicFaculty);
academicFacultyRouter.get(
  '/:id',
  academicFacultyController.getSingleAcademicFaculty
);
academicFacultyRouter.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  validateRequest(AcademicFacultyValidation.updateAcademicFaculty),
  academicFacultyController.updateAcademicFaculty
);
academicFacultyRouter.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  academicFacultyController.deleteAcademicFaculty
);
export default academicFacultyRouter;
