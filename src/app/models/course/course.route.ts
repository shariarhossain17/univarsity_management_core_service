import express from 'express';
import { courseController } from './course.controller';

const courseRouter = express.Router();

courseRouter.post('/', courseController.createCourse);
courseRouter.get('/', courseController.getAllCourse);
courseRouter.get('/:id', courseController.getCourseById);
courseRouter.patch('/:id', courseController.updateOneInDB);
courseRouter.delete('/:id', courseController.deleteCourse);

export default courseRouter;
