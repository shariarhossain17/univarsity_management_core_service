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

const updateSemesterRegistration = catchAsync(
  async (req: Request, res: Response) => {
    const result = await semesterRegistrationService.updateSemesterRegistration(
      req.params.id,
      req.body
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'semesterRegistration update success',
      data: result,
    });
  }
);

const startStudentRegistration = catchAsync(
  async (req: Request, res: Response) => {
    const user = req.user;
    const result = await semesterRegistrationService.startMyRegistration(
      user.userId
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'student registration completed ',
      data: result,
    });
  }
);

const studentSemesterRegistrationCourse = catchAsync(
  async (req: Request, res: Response) => {
    const userId = req?.user?.userId;

    const result =
      await semesterRegistrationService.studentSemesterRegistrationCourse(
        userId,
        req.body
      );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'student registration enroll ',
      data: result,
    });
  }
);

const withdrawCourse = catchAsync(async (req: Request, res: Response) => {
  const userId = req?.user?.userId;

  const result = await semesterRegistrationService.withdrawCourse(
    userId,
    req.body
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'success ',
    data: result,
  });
});

const confirmMyCourse = catchAsync(async (req: Request, res: Response) => {
  const userId = req?.user?.userId;

  const result = await semesterRegistrationService.confirmMyCourse(userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'success ',
    data: result,
  });
});

export const semesterRegistrationController = {
  createSemesterRegistration,
  deleteSemesterRegistration,
  getAllSemesterRegistration,
  getSingleSemesterRegistration,
  updateSemesterRegistration,
  startStudentRegistration,
  studentSemesterRegistrationCourse,
  withdrawCourse,
  confirmMyCourse,
};
