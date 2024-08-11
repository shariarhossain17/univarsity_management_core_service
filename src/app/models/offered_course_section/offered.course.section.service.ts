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

export const offeredCoursesSectionService = {
  insertOfferedCourse,
};
