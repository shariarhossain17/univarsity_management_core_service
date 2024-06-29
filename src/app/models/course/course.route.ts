import express from 'express';
import validateRequest from '../../../middlewares/validateRequest';
import { courseController } from './course.controller';
import { coursesZodValidation } from './course.zod.validation';

const courseRouter = express.Router();

courseRouter.post('/', courseController.createCourse);
courseRouter.post(
  '/:id/assign-course',
  validateRequest(coursesZodValidation.assignAndRemoveValidations),
  courseController.assignCourseFaculty
);
courseRouter.get('/', courseController.getAllCourse);
courseRouter.get('/assign-course', courseController.getAssignCourse);
courseRouter.get('/:id', courseController.getCourseById);
courseRouter.patch('/:id', courseController.updateOneInDB);
courseRouter.delete('/:id', courseController.deleteCourse);
courseRouter.delete(
  '/:id/assign-course',
  validateRequest(coursesZodValidation.assignAndRemoveValidations),
  courseController.deleteAssignCourse
);

export default courseRouter;
