import { Prisma, offeredCourseClassSchedule } from '@prisma/client';
import { paginationHelpers } from '../../../helper/pagination.helper';
import { IGenericResponse } from '../../../interface/common';
import { IPaginationOptions } from '../../../interface/pagination';
import prisma from '../../../shared/prisma';
import { IOfferedCourseFilters } from '../offered_course_section/offered.course.section.interface';
import {
  offeredClassScheduleFiltrableField,
  offeredClassScheduleMapper,
  offeredCourseClassScheduleSearch,
} from './offered.course.class.schedule.constant';
import { offeredCourseClassScheduleUtils } from './offered.course.schedule.utils';

const insertToDb = async (
  data: offeredCourseClassSchedule
): Promise<offeredCourseClassSchedule> => {
  await offeredCourseClassScheduleUtils.checkTimeScheduleAvailable(data);
  await offeredCourseClassScheduleUtils.facultyAvailabilityChecked(data);

  const result = await prisma.offeredCourseClassSchedule.create({
    data,
  });

  return result;
};

const getAllData = async (
  filter: IOfferedCourseFilters,
  paginationOption: IPaginationOptions
): Promise<IGenericResponse<offeredCourseClassSchedule[]>> => {
  const { limit, page, skip } =
    paginationHelpers.calculatePagination(paginationOption);

  const { searchTerm, ...filterData } = filter;

  console.log(searchTerm);

  const andConditions: any[] = [];
  if (searchTerm) {
    andConditions.push({
      OR: offeredCourseClassScheduleSearch.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map(key => {
        if (offeredClassScheduleFiltrableField.includes(key)) {
          return {
            [offeredClassScheduleMapper[key]]: {
              id: (filterData as any)[key],
            },
          };
        } else {
          return {
            [key]: {
              equals: (filterData as any)[key],
            },
          };
        }
      }),
    });
  }

  const whereConditions: Prisma.offeredCourseClassScheduleWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.offeredCourseClassSchedule.findMany({
    where: whereConditions,
    skip,
    take: limit,
    include: {
      room: true,
      semesterRegistration: true,
      faculty: true,
      offeredCourseSection: true,
    },
    orderBy:
      paginationOption.sortBy && paginationOption.sortOrder
        ? {
            [paginationOption.sortBy]: paginationOption.sortOrder,
          }
        : {
            createdAt: 'asc',
          },
  });

  const totalCount = await prisma.offeredCourseClassSchedule.count();

  return {
    meta: {
      page,
      limit,
      total: totalCount,
    },
    data: result,
  };
};

export const offeredCourseClassScheduleService = {
  insertToDb,
  getAllData,
};
