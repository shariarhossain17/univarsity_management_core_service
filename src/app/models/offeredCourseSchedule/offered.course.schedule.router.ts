import express from 'express';
import { offeredCourseClassScheduleController } from './offered.course.schedule.controller';

const offeredCourseClassScheduleRouter = express.Router();

offeredCourseClassScheduleRouter.post(
  '/',
  offeredCourseClassScheduleController.insertDataToDb
);

export default offeredCourseClassScheduleRouter;
