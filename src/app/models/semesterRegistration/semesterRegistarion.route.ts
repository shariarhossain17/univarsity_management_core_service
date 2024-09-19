import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../../middlewares/auth';
import validateRequest from '../../../middlewares/validateRequest';
import { semesterRegistrationController } from './semesterRegistration.controller';
import { semesterRegistrationZodValidation } from './semesterRegistration.zod.validation';

const semesterRegistrationRouter = express.Router();

semesterRegistrationRouter.post(
  '/',
  validateRequest(semesterRegistrationZodValidation.semesterRegistration),
  semesterRegistrationController.createSemesterRegistration
);
semesterRegistrationRouter.post(
  '/student-registration',
  auth(ENUM_USER_ROLE.STUDENT),
  semesterRegistrationController.startStudentRegistration
);
semesterRegistrationRouter.post(
  '/student-enroll',
  validateRequest(semesterRegistrationZodValidation.coursesEnrollWithdraw),
  auth(ENUM_USER_ROLE.STUDENT),
  semesterRegistrationController.studentSemesterRegistrationCourse
);
semesterRegistrationRouter.post(
  '/confirm-course',
  auth(ENUM_USER_ROLE.STUDENT),
  semesterRegistrationController.confirmMyCourse
);
semesterRegistrationRouter.post(
  '/withdraw-course',
  validateRequest(semesterRegistrationZodValidation.coursesEnrollWithdraw),
  auth(ENUM_USER_ROLE.STUDENT),

  semesterRegistrationController.withdrawCourse
);
semesterRegistrationRouter.get(
  '/',
  semesterRegistrationController.getAllSemesterRegistration
);
semesterRegistrationRouter.get(
  '/:id',
  semesterRegistrationController.getSingleSemesterRegistration
);
semesterRegistrationRouter.patch(
  '/:id',
  semesterRegistrationController.updateSemesterRegistration
);
semesterRegistrationRouter.delete(
  '/:id',
  semesterRegistrationController.deleteSemesterRegistration
);

export default semesterRegistrationRouter;
