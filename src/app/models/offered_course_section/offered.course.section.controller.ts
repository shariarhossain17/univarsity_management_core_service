import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsynch';
import sendResponse from '../../../shared/sendResponse';
import { offeredCoursesSectionService } from './offered.course.section.service';

const insertOfferedCourse = catchAsync(async (req: Request, res: Response) => {
  const result = await offeredCoursesSectionService.insertOfferedCourse(
    req.body
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'offered course section create',
    data: result,
  });
});

export const offeredCoursesSectionController = {
  insertOfferedCourse,
};
