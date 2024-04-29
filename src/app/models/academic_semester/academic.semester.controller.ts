import { AcademicSemester } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import sendResponse from '../../../shared/sendResponse';
import { academicSemesterService } from './academic.semester.services';

const insertAcademicSemester = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await academicSemesterService.insertAcademicSemester(
      req.body
    );

    sendResponse<AcademicSemester>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic semester created',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const academicSemesterController = {
  insertAcademicSemester,
};
