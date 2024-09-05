import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../../middlewares/auth';
import validateRequest from '../../../middlewares/validateRequest';
import { createStudentController } from './student.controller';
import { studentZodValidation } from './student.zod.validation';

const studentRouter = express.Router();

studentRouter.post(
  '/',
  // auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  validateRequest(studentZodValidation.createStudent),
  createStudentController.createStudent
);

studentRouter.get('/', createStudentController.getAllStudent);

studentRouter.get('/:id', createStudentController.getSingleStudent);
studentRouter.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  validateRequest(studentZodValidation.updateStudent),
  createStudentController.updateStudent
);
studentRouter.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  createStudentController.deleteStudent
);

export default studentRouter;
