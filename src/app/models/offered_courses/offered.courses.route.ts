import express from 'express';
import validateRequest from '../../../middlewares/validateRequest';
import { offeredCourseController } from './offered.course.controller';
import { offeredCourseZodValidation } from './offered.course.zod.validation';

const offeredCourseRouter = express.Router();

offeredCourseRouter.post(
  '/',
  validateRequest(offeredCourseZodValidation.offeredCourseCreate),
  offeredCourseController.insertToDbController
);

export default offeredCourseRouter;
