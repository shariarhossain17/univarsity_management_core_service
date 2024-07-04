import express from 'express';
import validateRequest from '../../../middlewares/validateRequest';
import { semesterRegistrationController } from './semesterRegistration.controller';
import { semesterRegistrationZodValidation } from './semesterRegistration.zod.validation';

const semesterRegistrationRouter = express.Router();

semesterRegistrationRouter.post(
  '/',
  validateRequest(semesterRegistrationZodValidation.semesterRegistration),
  semesterRegistrationController.createSemesterRegistration
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
