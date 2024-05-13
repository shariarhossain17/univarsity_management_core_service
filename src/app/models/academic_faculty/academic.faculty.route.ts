import express from 'express';
import validateRequest from '../../../middlewares/validateRequest';
import { AcademicFacultyValidation } from './acadamic.faculty.zod.validation';
import { academicFacultyController } from './acadmic.faculty.controller';
const academicFacultyRouter = express.Router();

academicFacultyRouter.post(
  '/',
  validateRequest(AcademicFacultyValidation.createAcademicFaculty),
  academicFacultyController.createAcademicFaculty
);

academicFacultyRouter.get('/', academicFacultyController.getAllAcademicFaculty);
academicFacultyRouter.get(
  '/:id',
  academicFacultyController.getSingleAcademicFaculty
);

export default academicFacultyRouter;
