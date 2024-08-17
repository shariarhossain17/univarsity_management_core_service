import express from 'express';
import { offeredCoursesSectionController } from './offered.course.section.controller';

const offeredCoursesSectionRouter = express.Router();

offeredCoursesSectionRouter.post(
  '/',
  offeredCoursesSectionController.insertOfferedCourse
);
offeredCoursesSectionRouter.get(
  '/',
  offeredCoursesSectionController.getOfferedCourse
);
offeredCoursesSectionRouter.get(
  '/:id',
  offeredCoursesSectionController.getSingleOfferedCourse
);
offeredCoursesSectionRouter.patch(
  '/:id',
  offeredCoursesSectionController.updateOfferedCourse
);
offeredCoursesSectionRouter.delete(
  '/:id',
  offeredCoursesSectionController.deleteOfferedCourse
);

export default offeredCoursesSectionRouter;
