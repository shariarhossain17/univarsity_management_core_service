import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsynch';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { offeredCourseClassScheduleFilter } from './offered.course.class.schedule.constant';
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

const getallData = catchAsync(async (req: Request, res: Response) => {
  const filterableField = pick(req.query, offeredCourseClassScheduleFilter);
  const pagination = pick(req.query, paginationFields);
  const result = await offeredCourseClassScheduleService.getAllData(
    filterableField,
    pagination
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'data retrieve success',
    meta: result.meta,
    data: result.data,
  });
});

export const offeredCourseClassScheduleController = {
  insertDataToDb,
  getallData,
};
