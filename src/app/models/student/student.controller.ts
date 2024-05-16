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

export const createStudentController = {
  createStudent,
};
