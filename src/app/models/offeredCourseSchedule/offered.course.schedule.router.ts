import express from 'express';
import { offeredCourseClassScheduleController } from './offered.course.schedule.controller';

const offeredCourseClassScheduleRouter = express.Router();

offeredCourseClassScheduleRouter.post(
  '/',
  offeredCourseClassScheduleController.insertDataToDb
);

offeredCourseClassScheduleRouter.get(
  '/',
  offeredCourseClassScheduleController.getallData
);

export default offeredCourseClassScheduleRouter;
