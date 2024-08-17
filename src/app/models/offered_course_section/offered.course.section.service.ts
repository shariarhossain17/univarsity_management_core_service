import { offeredCoursesSection } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/apiError';
import prisma from '../../../shared/prisma';

const insertOfferedCourse = async (
  data: offeredCoursesSection
): Promise<offeredCoursesSection> => {
  console.log(data);
  const isExistOfferedCourse = await prisma.offeredCourse.findFirst({
    where: {
      id: data.offeredCourseId,
    },
  });

  if (!isExistOfferedCourse) {
    throw new ApiError(httpStatus.BAD_GATEWAY, 'offered course not found');
  }

  data.semesterRegestrationId = isExistOfferedCourse.semesterRegestrationId;

  const result = await prisma.offeredCoursesSection.create({
    data: data,
  });

  return result;
};

const getOfferedCourse = async (): Promise<offeredCoursesSection[]> => {
  const result = await prisma.offeredCoursesSection.findMany({});

  return result;
};

const getSingleOfferedCourse = async (
  id: string
): Promise<offeredCoursesSection | null> => {
  const result = await prisma.offeredCoursesSection.findUnique({
    where: {
      id,
    },
  });
  return result;
};

const updateOfferedCourse = async (
  id: string,
  data: offeredCoursesSection
): Promise<offeredCoursesSection> => {
  const result = await prisma.offeredCoursesSection.update({
    where: {
      id: id,
    },
    data: data,
  });
  return result;
};

const deleteOfferedCourse = async (
  id: string
): Promise<offeredCoursesSection> => {
  const result = await prisma.offeredCoursesSection.delete({
    where: {
      id,
    },
  });

  return result;
};

export const offeredCoursesSectionService = {
  insertOfferedCourse,
  getOfferedCourse,
  getSingleOfferedCourse,
  updateOfferedCourse,
  deleteOfferedCourse,
};
