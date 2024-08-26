import { offeredCourseClassSchedule } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/apiError';
import prisma from '../../../shared/prisma';
import { isTimeChecked } from '../../../shared/utils';
import { bookedSchedule, schedule } from './offered.course.schedule.utils';

const insertToDb = async (
  data: offeredCourseClassSchedule
): Promise<offeredCourseClassSchedule> => {
  const isBooked: offeredCourseClassSchedule[] =
    await prisma.offeredCourseClassSchedule.findMany({
      where: {
        dayOfWeek: data.dayOfWeek,
      },
    });

  // console.log(bookedSchedule(isBooked));
  // console.log(schedule(data));

  console.log(isTimeChecked(bookedSchedule(isBooked), schedule(data)));

  if (isTimeChecked(bookedSchedule(isBooked), schedule(data))) {
    throw new ApiError(
      httpStatus.CONFLICT,
      `Time slot conflict: overlaps with existing slot `
    );
  }
  const result = await prisma.offeredCourseClassSchedule.create({
    data,
  });

  return result;
};

export const offeredCourseClassScheduleService = {
  insertToDb,
};
