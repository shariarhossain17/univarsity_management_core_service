import { Request, Response } from 'express';

import { student } from '@prisma/client';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsynch';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { studentFilterableField } from './student.constant';
import { studentService } from './student.service';

const createStudent = catchAsync(async (req: Request, res: Response) => {
  const result = await studentService.createStudentService(req.body);
  sendResponse<student>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'student data create success',
    data: result,
  });
});

const getAllStudent = catchAsync(async (req: Request, res: Response) => {
  const option = pick(req.query, ['searchTerm', ...studentFilterableField]);

  const paginationOptions = pick(req.query, paginationFields);
  const result = await studentService.getAllStudent(option, paginationOptions);
  sendResponse<student[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'student data retrieve  success',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleStudent = catchAsync(async (req: Request, res: Response) => {
  const result = await studentService.getSingleStudent(req.params.id);
  sendResponse<student | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'student data retrieve  success',
    data: result,
  });
});

export const createStudentController = {
  createStudent,
  getSingleStudent,
  getAllStudent,
};
