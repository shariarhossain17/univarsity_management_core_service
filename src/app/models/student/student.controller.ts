import { Request, Response } from 'express';

import { Student } from '@prisma/client';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsynch';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { studentFilterableField } from './student.constant';
import { studentService } from './student.service';

const createStudent = catchAsync(async (req: Request, res: Response) => {
  const result = await studentService.createStudentService(req.body);
  sendResponse<Student>(res, {
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
  sendResponse<Student[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'student data retrieve  success',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleStudent = catchAsync(async (req: Request, res: Response) => {
  const result = await studentService.getSingleStudent(req.params.id);
  sendResponse<Student | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'student data retrieve  success',
    data: result,
  });
});

const updateStudent = catchAsync(async (req: Request, res: Response) => {
  const result = await studentService.updateStudent(req.params.id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'student update r  success',
    data: result,
  });
});
const deleteStudent = catchAsync(async (req: Request, res: Response) => {
  const result = await studentService.deleteStudent(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'student delete success',
    data: result,
  });
});

const getMyCourse = catchAsync(async (req: Request, res: Response) => {
  const user = req.user as any;

  const filter = pick(req.query, ['courseId', 'academicSemesterId']);
  const result = await studentService.getMyCourse(user.userId, filter);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'student course fetched course',
    data: result,
  });
});

const getMyCourseSchedule = catchAsync(async (req: Request, res: Response) => {
  const user = req.user as any;

  const filter = pick(req.query, ['courseId', 'academicSemesterId']);
  const result = await studentService.getMyCourseSchedule(user.userId, filter);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'fetched course schedule',
    data: result,
  });
});

const getMyAcademicInfo = catchAsync(async (req: Request, res: Response) => {
  const user = req.user as any;

  const result = await studentService.getMyAcademicInfo(user.userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'fetched course schedule',
    data: result,
  });
});
export const createStudentController = {
  createStudent,
  getSingleStudent,
  getAllStudent,
  updateStudent,
  deleteStudent,
  getMyCourse,
  getMyCourseSchedule,
  getMyAcademicInfo,
};
