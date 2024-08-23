import { offeredCourseClassSchedule } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/apiError';
import prisma from '../../../shared/prisma';

const insertToDb = async (
  data: offeredCourseClassSchedule
): Promise<offeredCourseClassSchedule> => {
  const isBooked = await prisma.offeredCourseClassSchedule.findMany({
    where: {
      dayOfWeek: data.dayOfWeek,
    },
  });

  const isExistSlots = isBooked.map(schedule => ({
    startTime: schedule.startTime,
    endTime: schedule.endTime,
    dayOfWeek: schedule.dayOfWeek,
  }));

  const newSlots = {
    startTime: data.startTime,
    endTime: data.endTime,
    dayOfWeek: data.dayOfWeek,
  };

  for (const slot of isExistSlots) {
    const isExistStart = new Date(`1970-01-01${slot.startTime}`);
    const isExistEnd = new Date(`1970-01-01${slot.endTime}`);
    const newStart = new Date(`1970-01-01${newSlots.startTime}`);
    const newEnd = new Date(`1970-01-01${newSlots.endTime}`);

    console.log(isExistStart, newEnd);

    if (newStart < isExistEnd && newEnd > isExistStart) {
      throw new ApiError(httpStatus.CONFLICT, 'already booked');
    }
  }

  const result = await prisma.offeredCourseClassSchedule.create({
    data,
  });

  return result;
};

export const offeredCourseClassScheduleService = {
  insertToDb,
};
