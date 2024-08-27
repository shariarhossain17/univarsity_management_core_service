import { offeredCourseClassSchedule } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/apiError';
import prisma from '../../../shared/prisma';
import { isTimeChecked } from '../../../shared/utils';

export const checkTimeScheduleAvailable = async (
  data: offeredCourseClassSchedule
) => {
  const booked = await prisma.offeredCourseClassSchedule.findMany({
    where: {
      dayOfWeek: data.dayOfWeek,
    },
  });

  const newDate = {
    startTime: data.startTime,
    endTime: data.endTime,
    dayOfWeek: data.dayOfWeek,
  };

  const isBooked = booked.map(b => ({
    startTime: b.startTime,
    endTime: b.endTime,
    dayOfWeek: b.dayOfWeek,
  }));

  if (isTimeChecked(isBooked, newDate)) {
    throw new ApiError(
      httpStatus.CONFLICT,
      `Time slot conflict: overlaps with existing slot `
    );
  }
};

export const offeredCourseClassScheduleUtils = {
  checkTimeScheduleAvailable,
};
