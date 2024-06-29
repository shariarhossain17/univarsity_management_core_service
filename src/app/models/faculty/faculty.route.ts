import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../../middlewares/auth';
import validateRequest from '../../../middlewares/validateRequest';
import { facultyController } from './faculty.controller';
import { facultyZodValidation } from './faculty.zod.validation';

const facultyRouter = express.Router();

facultyRouter.post(
  '/',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  validateRequest(facultyZodValidation.createFaculty),
  facultyController.createFaculty
);

facultyRouter.post(
  '/:id/assign-faculty',
  validateRequest(facultyZodValidation.assignAndRemoveValidations),
  facultyController.assignCourses
);

facultyRouter.get('/', facultyController.getAllStudent);

facultyRouter.get('/:id', facultyController.getSingleStudent);
facultyRouter.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  validateRequest(facultyZodValidation.updateFaculty),
  facultyController.updateFaculty
);
facultyRouter.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  facultyController.deleteFaculty
);

facultyRouter.delete(
  '/:id/assign-faculty',
  validateRequest(facultyZodValidation.assignAndRemoveValidations),
  facultyController.deleteCourses
);

export default facultyRouter;
