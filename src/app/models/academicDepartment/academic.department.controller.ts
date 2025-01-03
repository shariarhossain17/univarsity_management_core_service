import { AcademicDepartment } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsynch';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { academicDepartmentFilterableField } from './academic.department.constant';
import { academicDepartmentService } from './academic.department.services';

const createAcademicDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const result = await academicDepartmentService.createAcademicDepartment(
      req.body
    );

    // console.log(result);

    sendResponse<AcademicDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic department created',
      data: result,
    });
  }
);

const getAllAcademicDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const option = pick(req.query, academicDepartmentFilterableField);
    const paginationOptions = pick(req.query, paginationFields);
    const result = await academicDepartmentService.getAllDepartment(
      option,
      paginationOptions
    );

    sendResponse<AcademicDepartment[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic faculty created',
      meta: result.meta,
      data: result.data,
    });
  }
);

const getSingleAcademicDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const result = await academicDepartmentService.getSingleDepartment(
      req.params.id
    );

    sendResponse<AcademicDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic faculty created',
      data: result,
    });
  }
);
const updateAcademicDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const result = await academicDepartmentService.updateAcademicDepartment(
      req.params.id,
      req.body
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'academic update   success',
      data: result,
    });
  }
);
const deleteAcademicDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const result = await academicDepartmentService.deleteAcademicDepartment(
      req.params.id
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'academicDepartment delete success',
      data: result,
    });
  }
);
export const academicDepartmentController = {
  createAcademicDepartment,
  getAllAcademicDepartment,
  getSingleAcademicDepartment,
  deleteAcademicDepartment,
  updateAcademicDepartment,
};
