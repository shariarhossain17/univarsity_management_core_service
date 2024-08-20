import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsynch';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { offeredCourseFilterableField } from './offered.course.constant';
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

const getOfferedCourse = catchAsync(async (req: Request, res: Response) => {
  const option = pick(req.query, offeredCourseFilterableField);
  const paginationOptions = pick(req.query, paginationFields);
  const result = await offeredCoursesSectionService.getOfferedCourse(
    option,
    paginationOptions
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'offered course get success',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleOfferedCourse = catchAsync(
  async (req: Request, res: Response) => {
    const result = await offeredCoursesSectionService.getSingleOfferedCourse(
      req.params.id
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'offered course get success',
      data: result,
    });
  }
);
const updateOfferedCourse = catchAsync(async (req: Request, res: Response) => {
  const result = await offeredCoursesSectionService.updateOfferedCourse(
    req.params.id,
    req.body
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'offered course update success',
    data: result,
  });
});

const deleteOfferedCourse = catchAsync(async (req: Request, res: Response) => {
  const result = await offeredCoursesSectionService.deleteOfferedCourse(
    req.params.id
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'offered course delete success',
    data: result,
  });
});

export const offeredCoursesSectionController = {
  insertOfferedCourse,
  getOfferedCourse,
  getSingleOfferedCourse,
  updateOfferedCourse,
  deleteOfferedCourse,
};
