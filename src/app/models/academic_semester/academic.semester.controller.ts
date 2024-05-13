import { AcademicSemester } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsynch';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { academicSemesterService } from './academic.semester.services';
import { academicSemesterFilterableFields } from './academis.semester.constant';

const insertAcademicSemester = catchAsync(
  async (req: Request, res: Response) => {
    const result = await academicSemesterService.insertAcademicSemester(
      req.body
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic semester created',
      data: result,
    });
  }
);

const getAcademicSemester = catchAsync(async (req: Request, res: Response) => {
  const option = pick(req.query, academicSemesterFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);
  const result = await academicSemesterService.getAllAcademicSemester(
    option,
    paginationOptions
  );

  sendResponse<AcademicSemester[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic semester data retrieve success',
    meta: result.meta,
    data: result.data,
  });
});
const getSingleSemester = catchAsync(async (req: Request, res: Response) => {
  const result = await academicSemesterService.getSingleAcademicSemester(
    req.params.id
  );

  sendResponse<AcademicSemester>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic semester data retrieve success',
    data: result,
  });
});
export const academicSemesterController = {
  insertAcademicSemester,
  getAcademicSemester,
  getSingleSemester,
};
