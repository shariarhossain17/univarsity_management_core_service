import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsynch';
import sendResponse from '../../../shared/sendResponse';
import { semesterRegistrationService } from './semesterRegistration.service';

const createSemesterRegistration = catchAsync(
  async (req: Request, res: Response) => {
    const result = await semesterRegistrationService.insertToDb(req.body);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'semesterRegistration create success',
      data: result,
    });
  }
);

const getAllSemesterRegistration = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await semesterRegistrationService.getAllSemesterRegistration();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'semesterRegistration delete success',
      data: result,
    });
  }
);
const getSingleSemesterRegistration = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await semesterRegistrationService.getSingleSemesterRegistration(
        req.params.id
      );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'semesterRegistration delete success',
      data: result,
    });
  }
);
const deleteSemesterRegistration = catchAsync(
  async (req: Request, res: Response) => {
    const result = await semesterRegistrationService.deleteSemesterRegistration(
      req.params.id
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'semesterRegistration delete success',
      data: result,
    });
  }
);
export const semesterRegistrationController = {
  createSemesterRegistration,
  deleteSemesterRegistration,
  getAllSemesterRegistration,
  getSingleSemesterRegistration,
};
