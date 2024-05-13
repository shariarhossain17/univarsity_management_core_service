import express from 'express';
import validateRequest from '../../../middlewares/validateRequest';
import { academicDepartmentController } from './academic.department.controller';
import { academicDepartmentZodValidation } from './academic.department.zod.validation';

const academicDepartmentRouter = express.Router();

academicDepartmentRouter.post(
  '/',
  validateRequest(academicDepartmentZodValidation.createAcademicDepartment),
  academicDepartmentController.createAcademicDepartment
);
academicDepartmentRouter.get(
  '/',

  academicDepartmentController.getAllAcademicDepartment
);
academicDepartmentRouter.get(
  '/:id',

  academicDepartmentController.getSingleAcademicDepartment
);

export default academicDepartmentRouter;
