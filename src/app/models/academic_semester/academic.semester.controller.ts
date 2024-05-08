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
    console.log(req.body);
    const result = await academicSemesterService.insertAcademicSemester(
      req.body
    );

    sendResponse<AcademicSemester>(res, {
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
    message: 'Academic semester created',
    meta: result.meta,
    data: result.data,
  });
});

export const academicSemesterController = {
  insertAcademicSemester,
  getAcademicSemester,
};
