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

studentRouter.get('/:id', createStudentController.getSingleStudent);

export default studentRouter;
