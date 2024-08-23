import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsynch';
import sendResponse from '../../../shared/sendResponse';
import { offeredCourseClassScheduleService } from './offered.course.schedule.service';

const insertDataToDb = catchAsync(async (req: Request, res: Response) => {
  const result = await offeredCourseClassScheduleService.insertToDb(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'data crate success',
    data: result,
  });
});

export const offeredCourseClassScheduleController = {
  insertDataToDb,
};
