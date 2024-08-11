import httpStatus from 'http-status';
import ApiError from '../../../errors/apiError';
import prisma from '../../../shared/prisma';
import { asyncForEach } from '../../../shared/utils';
import { IOfferedCourse } from './offered.course.interface';

const insertToDb = async (data: IOfferedCourse): Promise<IOfferedCourse[]> => {
  const { academicDepartmentId, semesterRegistrationId, courseIds } = data;

  const result: any[] = [];
  await asyncForEach(courseIds, async (courseId: string) => {
    const isExist = await prisma.offeredCourse.findFirst({
      where: {
        academicDepartmentId,
        semesterRegestrationId: semesterRegistrationId,
        courseId,
      },
    });

    if (isExist) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        'offered course already exist'
      );
    }
    const insertData = await prisma.offeredCourse.create({
      data: {
        academicDepartmentId,
        semesterRegestrationId: semesterRegistrationId,
        courseId,
      },
    });

    result.push(insertData);
  });

  return result;
};

export const offeredCourseService = {
  insertToDb,
};
