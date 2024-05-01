import { AcademicSemester } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsynch';
import sendResponse from '../../../shared/sendResponse';
import { academicSemesterService } from './academic.semester.services';

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

export const academicSemesterController = {
  insertAcademicSemester,
};
