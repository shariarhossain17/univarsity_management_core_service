import { Prisma, offeredCoursesSection } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/apiError';
import { paginationHelpers } from '../../../helper/pagination.helper';
import { IGenericResponse } from '../../../interface/common';
import { IPaginationOptions } from '../../../interface/pagination';
import prisma from '../../../shared/prisma';
import { asyncForEach } from '../../../shared/utils';
import { offeredCourseClassScheduleUtils } from '../offeredCourseSchedule/offered.course.schedule.utils';
import { IOfferedCourseFilters } from './offered.course.section.interface';

const insertOfferedCourse = async (payload: any) => {
  const { classSchedules, ...data } = payload;

  const isExistOfferedCourse = await prisma.offeredCourse.findFirst({
    where: {
      id: data.offeredCourseId,
    },
  });

  if (!isExistOfferedCourse) {
    throw new ApiError(httpStatus.BAD_GATEWAY, 'offered course not found');
  }

  data.semesterRegestrationId = isExistOfferedCourse.semesterRegestrationId;

  await asyncForEach(classSchedules, async (schedule: any) => {
    await offeredCourseClassScheduleUtils.facultyAvailabilityChecked(schedule);
    await offeredCourseClassScheduleUtils.checkTimeScheduleAvailable(schedule);
  });

  const createSection = await prisma.$transaction(async (transactionClient) => {
    const createOfferedCourseSection =
      await transactionClient.offeredCoursesSection.create({
        data: data,
      });

    const scheduleData = classSchedules.map((schedule: any) => ({
      startTime: schedule.startTime,
      endTime: schedule.endTime,
      dayOfWeek: schedule.dayOfWeek,
      roomId: schedule.roomId,
      facultyId: schedule.facultyId,
      offeredCourseSectionId: createOfferedCourseSection.id,
      semesterRegistrationId: isExistOfferedCourse.semesterRegestrationId,
    }));

    const createSchedule =
      await transactionClient.offeredCourseClassSchedule.createMany({
        data: scheduleData,
      });
    return createSchedule;
  });

  return 'success';
};
const getOfferedCourse = async (
  filters: IOfferedCourseFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<offeredCoursesSection[]>> => {
  const { page, limit, skip } =
    paginationHelpers.calculatePagination(paginationOptions);

  const { searchTerm, ...filtersData } = filters;

  let andConditions: Prisma.offeredCoursesSectionWhereInput[] = [];

  if (searchTerm) {
    andConditions.push({
      OR: ['title'].map((field) => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length > 0) {
    andConditions.push({
      AND: Object.keys(filtersData).map((key) => ({
        [key]: {
          equals: filtersData[key as keyof typeof filtersData],
        },
      })),
    });
  }

  const whereConditions: Prisma.offeredCoursesSectionWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.offeredCoursesSection.findMany({
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
  });

  const totalCount = await prisma.offeredCoursesSection.count();
  return {
    meta: {
      page,
      limit,
      total: totalCount,
    },
    data: result,
  };
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
