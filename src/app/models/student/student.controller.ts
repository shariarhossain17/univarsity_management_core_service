import { Request, Response } from 'express';

import { student } from '@prisma/client';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsynch';
import sendResponse from '../../../shared/sendResponse';
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
};
