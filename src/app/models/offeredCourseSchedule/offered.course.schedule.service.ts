import { offeredCourseClassSchedule } from '@prisma/client';
import prisma from '../../../shared/prisma';
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

export const offeredCourseClassScheduleService = {
  insertToDb,
};
