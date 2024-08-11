import express from 'express';
import { offeredCoursesSectionController } from './offered.course.section.controller';

const offeredCoursesSectionRouter = express.Router();

offeredCoursesSectionRouter.post(
  '/',
  offeredCoursesSectionController.insertOfferedCourse
);
export default offeredCoursesSectionRouter;
