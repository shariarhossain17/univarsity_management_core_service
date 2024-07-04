import {
  semesterRegistration,
  semesterRegistrationStatus,
} from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/apiError';
import prisma from '../../../shared/prisma';

const insertToDb = async (
  payload: semesterRegistration
): Promise<semesterRegistration> => {
  const isSemesterRegistrationStatus =
    await prisma.semesterRegistration.findFirst({
      where: {
        OR: [
          {
            status: semesterRegistrationStatus.UPCOMING,
          },
          {
            status: semesterRegistrationStatus.UPCOMING,
          },
        ],
      },
    });

  if (isSemesterRegistrationStatus)
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      `there is already  an ${isSemesterRegistrationStatus.status}`
    );
  const result = await prisma.semesterRegistration.create({
    data: payload,
  });

  return result;
};

const getAllSemesterRegistration = async (): Promise<
  semesterRegistration[]
> => {
  const result = await prisma.semesterRegistration.findMany({
    include: {
      academicSemester: true,
    },
  });
  return result;
};
const getSingleSemesterRegistration = async (
  id: string
): Promise<semesterRegistration | null> => {
  const result = await prisma.semesterRegistration.findUnique({
    where: {
      id,
    },
  });
  return result;
};

const deleteSemesterRegistration = async (
  id: string
): Promise<semesterRegistration> => {
  const result = await prisma.semesterRegistration.delete({
    where: {
      id,
    },
  });

  return result;
};
const updateSemesterRegistration = async (
  id: string,
  payload: Partial<semesterRegistration>
): Promise<semesterRegistration> => {
  const isExist = await prisma.semesterRegistration.findUnique({
    where: {
      id,
    },
  });

  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, "data is't exist");
  }

  if (
    payload?.status &&
    isExist.status == semesterRegistrationStatus.UPCOMING &&
    payload.status !== semesterRegistrationStatus.ONGOING
  ) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'can only move from UPCOMING to ONGOING '
    );
  }

  if (
    payload?.status &&
    isExist.status == semesterRegistrationStatus.ONGOING &&
    payload.status !== semesterRegistrationStatus.ENDED
  ) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'can only move from ONGOING to ENDED '
    );
  }

  const result = await prisma.semesterRegistration.update({
    where: {
      id,
    },
    data: payload,
    include: {
      academicSemester: true,
    },
  });

  return result;
};
export const semesterRegistrationService = {
  insertToDb,
  deleteSemesterRegistration,
  getAllSemesterRegistration,
  getSingleSemesterRegistration,
  updateSemesterRegistration,
};
