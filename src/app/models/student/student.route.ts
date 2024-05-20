import express from 'express';
import validateRequest from '../../../middlewares/validateRequest';
import { createStudentController } from './student.controller';
import { studentZodValidation } from './student.zod.validation';

const studentRouter = express.Router();

studentRouter.post(
  '/',
  validateRequest(studentZodValidation.createStudent),
  createStudentController.createStudent
);

studentRouter.get('/', createStudentController.getAllStudent);

studentRouter.get('/:id', createStudentController.getSingleStudent);
studentRouter.patch(
  '/:id',
  validateRequest(studentZodValidation.updateStudent),
  createStudentController.updateStudent
);
studentRouter.delete('/:id', createStudentController.deleteStudent);

export default studentRouter;
