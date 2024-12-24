import express from 'express';
import validateRequest from '../../../middlewares/validateRequest';
import { academicDepartmentController } from './academic.department.controller';
import { academicDepartmentZodValidation } from './academic.department.zod.validation';

const academicDepartmentRouter = express.Router();

academicDepartmentRouter.post(
  '/',
  validateRequest(academicDepartmentZodValidation.createAcademicDepartment),
  // auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
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
academicDepartmentRouter.patch(
  '/:id',
  validateRequest(academicDepartmentZodValidation.updateAcademicDepartment),
  academicDepartmentController.updateAcademicDepartment
);
academicDepartmentRouter.delete(
  '/:id',
  academicDepartmentController.deleteAcademicDepartment
);
export default academicDepartmentRouter;
