import { Course, Prisma } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/apiError';
import { paginationHelpers } from '../../../helper/pagination.helper';
import { IGenericResponse } from '../../../interface/common';
import { IPaginationOptions } from '../../../interface/pagination';
import prisma from '../../../shared/prisma';

import { asyncForEach } from '../../../shared/utils';
import { courseSearchableFields } from './course.constant';
import {
  ICourseCreateData,
  ICourseFilerOption,
  IPrerequisiteCourseRequest,
} from './course.interface';

const createCourse = async (data: ICourseCreateData): Promise<Course> => {
  const { preRequisiteCourses, ...courseData } = data;

  const newCourse = await prisma.$transaction(async transactionClient => {
    const createdCourse = await transactionClient.course.create({
      data: courseData,
    });

    if (!createdCourse) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Unable to create course');
    }

    if (preRequisiteCourses.length > 0) {
      for (let i = 0; i < preRequisiteCourses.length; i++) {
        await transactionClient.courseToPrerequisite.create({
          data: {
            courseId: createdCourse.id,
            preRequisiteId: preRequisiteCourses[i].courseId,
          },
        });
      }
    }

    return createdCourse;
  });

  const createdCourseData = await prisma.course.findUnique({
    where: {
      id: newCourse.id,
    },
    include: {
      preRequisite: {
        include: {
          preRequisite: true,
        },
      },
      preRequisiteFor: {
        include: {
          course: true,
        },
      },
    },
  });

  if (!createdCourseData) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Unable to fetch course data');
  }

  return createdCourseData;
};

const getAllCourse = async (
  filters: ICourseFilerOption,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<Course[]>> => {
  const { page, limit, skip } =
    paginationHelpers.calculatePagination(paginationOptions);

  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: courseSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length > 0) {
    andConditions.push({
      AND: Object.keys(filtersData).map(key => ({
        [key]: {
          equals: (filtersData as any)[key],
        },
      })),
    });
  }
  const whereConditions: Prisma.CourseWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const totalCount = await prisma.course.count();
  const result = await prisma.course.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      paginationOptions.sortBy && paginationOptions.sortOrder
        ? {
            [paginationOptions.sortBy]: paginationOptions.sortOrder,
          }
        : {
            createdAt: 'asc',
          },
    include: {
      preRequisite: {
        include: {
          preRequisite: true,
        },
      },
      preRequisiteFor: {
        include: {
          course: true,
        },
      },
    },
  });

  return {
    meta: {
      page,
      limit,
      total: totalCount,
    },
    data: result,
  };
};

const getSingleCourse = async (id: string): Promise<Course | null> => {
  const result = await prisma.course.findUnique({
    where: {
      id: id,
    },

    include: {
      preRequisite: {
        include: {
          preRequisite: true,
        },
      },
      preRequisiteFor: {
        include: {
          course: true,
        },
      },
    },
  });

  return result;
};

const updateSingleCourse = async (
  id: string,
  payload: ICourseCreateData
): Promise<Course | null> => {
  const { preRequisiteCourses, ...updateData } = payload;

  await prisma.$transaction(async transactionClient => {
    const result = await transactionClient.course.update({
      where: {
        id,
      },
      data: updateData,
    });

    if (!result) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Unable to update course');
    }

    if (preRequisiteCourses && preRequisiteCourses.length > 0) {
      const deletePrerequisite = preRequisiteCourses.filter(
        coursePrerequisite =>
          coursePrerequisite.courseId && coursePrerequisite.isDeleted
      );

      const newPrerequisite = preRequisiteCourses.filter(
        coursePrerequisite =>
          coursePrerequisite.courseId && !coursePrerequisite.isDeleted
      );

      await asyncForEach(
        deletePrerequisite,
        async (deletePreCourse: IPrerequisiteCourseRequest) => {
          await transactionClient.courseToPrerequisite.deleteMany({
            where: {
              AND: [
                {
                  courseId: id,
                },
                {
                  preRequisiteId: deletePreCourse.courseId,
                },
              ],
            },
          });
        }
      );

      await asyncForEach(
        newPrerequisite,
        async (insertPrerequisite: IPrerequisiteCourseRequest) => {
          await transactionClient.courseToPrerequisite.create({
            data: {
              courseId: id,
              preRequisiteId: insertPrerequisite.courseId,
            },
          });
        }
      );
    }

    return result;
  });

  const responseData = await prisma.course.findUnique({
    where: {
      id,
    },
    include: {
      preRequisite: {
        include: {
          preRequisite: true,
        },
      },
      preRequisiteFor: {
        include: {
          course: true,
        },
      },
    },
  });

  return responseData;
};

const deleteCourse = async (id: string): Promise<Course> => {
  await prisma.courseToPrerequisite.deleteMany({
    where: {
      OR: [
        {
          courseId: id,
        },
        {
          preRequisiteId: id,
        },
      ],
    },
  });

  const result = await prisma.course.delete({
    where: {
      id,
    },
  });
  return result;

  return result;
};
export const courseService = {
  createCourse,
  getAllCourse,
  getSingleCourse,
  updateSingleCourse,
  deleteCourse,
};
