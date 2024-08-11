import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsynch';
import sendResponse from '../../../shared/sendResponse';
import { offeredCourseService } from './offered.course.service';

const insertToDbController = catchAsync(async (req: Request, res: Response) => {
  const result = await offeredCourseService.insertToDb(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'offered course create success',
    data: result,
  });
});

export const offeredCourseController = {
  insertToDbController,
};
