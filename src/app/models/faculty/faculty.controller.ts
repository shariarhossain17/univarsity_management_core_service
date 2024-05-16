import { Request, Response } from 'express';

import { Faculty } from '@prisma/client';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsynch';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { facultyFilterableField } from './faculty.constant';
import { facultyService } from './faculty.service';

const createFaculty = catchAsync(async (req: Request, res: Response) => {
  const result = await facultyService.createFacultytService(req.body);
  sendResponse<Faculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'student data create success',
    data: result,
  });
});

const getAllStudent = catchAsync(async (req: Request, res: Response) => {
  const option = pick(req.query, ['searchTerm', ...facultyFilterableField]);

  const paginationOptions = pick(req.query, paginationFields);
  const result = await facultyService.getAllFaculty(option, paginationOptions);
  sendResponse<Faculty[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'student data retrieve  success',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleStudent = catchAsync(async (req: Request, res: Response) => {
  const result = await facultyService.getSingleFaculty(req.params.id);
  sendResponse<Faculty | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'student data retrieve  success',
    data: result,
  });
});

export const facultyController = {
  createFaculty,
  getSingleStudent,
  getAllStudent,
};
