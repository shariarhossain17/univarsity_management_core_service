import express from 'express';
import { studentEnrollCourseMarkController } from './student.enroll.course.mark.controller';

const enrollStudentMarkRouter = express.Router();

enrollStudentMarkRouter.patch(
  '/update-marks',
  studentEnrollCourseMarkController.studentMarkUpdate
);
enrollStudentMarkRouter.patch(
  '/update-final-marks',
  studentEnrollCourseMarkController.studentFinalMarkUpdate
);

export default enrollStudentMarkRouter;
