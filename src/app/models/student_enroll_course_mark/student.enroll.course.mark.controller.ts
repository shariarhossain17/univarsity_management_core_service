import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsynch';
import sendResponse from '../../../shared/sendResponse';
import { studentEnrolledCourseMarkService } from './student.enroll.course.mark.service';

const studentMarkUpdate = catchAsync(async (req: Request, res: Response) => {
  const result = await studentEnrolledCourseMarkService.updateMarks(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'mark update success',
    data: result,
  });
});

export const studentEnrollCourseMarkController = {
  studentMarkUpdate,
};
