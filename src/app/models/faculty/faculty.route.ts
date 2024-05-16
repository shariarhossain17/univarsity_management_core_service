import express from 'express';
import validateRequest from '../../../middlewares/validateRequest';
import { facultyController } from './faculty.controller';
import { facultyZodValidation } from './faculty.zod.validation';

const facultyRouter = express.Router();

facultyRouter.post(
  '/',
  validateRequest(facultyZodValidation.createFaculty),
  facultyController.createFaculty
);

facultyRouter.get('/', facultyController.getAllStudent);

facultyRouter.get('/:id', facultyController.getSingleStudent);

export default facultyRouter;
