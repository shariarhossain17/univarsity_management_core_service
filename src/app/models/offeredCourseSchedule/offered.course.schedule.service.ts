import { offeredCourseClassSchedule } from '@prisma/client';
import { paginationHelpers } from '../../../helper/pagination.helper';
import { IPaginationOptions } from '../../../interface/pagination';
import prisma from '../../../shared/prisma';
import { IOfferedCourseFilters } from '../offered_course_section/offered.course.section.interface';
import { offeredCorseClassScheduleSearch } from './offered.course.class.schedule.constant';
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

const getallData = async (
  filter: IOfferedCourseFilters,
  paginationOption: IPaginationOptions
): Promise<offeredCourseClassSchedule[]> => {
  const { limit, page, skip } =
    paginationHelpers.calculatePagination(paginationOption);

  const { searchTerm, ...filterData } = filter;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: offeredCorseClassScheduleSearch.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map(key => {}),
    });
  }
  const result = await prisma.offeredCourseClassSchedule.findMany({});
  return result;
};

export const offeredCourseClassScheduleService = {
  insertToDb,
  getallData,
};
