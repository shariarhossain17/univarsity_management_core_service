import { AcademicFaculty } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';

import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsynch';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { academicFacultyFilterableField } from './academic.faculty.constant';
import { academicFaculty } from './academic.facutly.service';

const createAcademicFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const result = await academicFaculty.createAcademicFaculty(req.body);

    sendResponse<AcademicFaculty>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic faculty created',

      data: result,
    });
  }
);

const getAllAcademicFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const option = pick(req.query, academicFacultyFilterableField);
    const paginationOptions = pick(req.query, paginationFields);
    const result = await academicFaculty.getAllFaculty(
      option,
      paginationOptions
    );

    sendResponse<AcademicFaculty[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic faculty created',
      meta: result.meta,
      data: result.data,
    });
  }
);

const getSingleAcademicFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const result = await academicFaculty.getSingleFaculty(req.params.id);

    sendResponse<AcademicFaculty>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic faculty created',

      data: result,
    });
  }
);

export const academicFacultyController = {
  createAcademicFaculty,
  getAllAcademicFaculty,
  getSingleAcademicFaculty,
};
