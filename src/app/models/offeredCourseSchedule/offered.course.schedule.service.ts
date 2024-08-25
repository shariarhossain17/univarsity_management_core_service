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

  console.log(isBooked);

  const newDate = {
    startTime: data.startTime,
    endTime: data.endTime,
    dayOfWeek: data.dayOfWeek,
  };

  console.log(newDate);

  for (const slot of isBooked) {
    // console.log(slot.startTime, slot.endTime);

    console.log('newStart', newDate.startTime, '\n', 'newEnd', newDate.endTime);

    let isExistStart = new Date(`1970-01-01T${slot.startTime}:00Z`);
    let isExistEnd = new Date(`1970-01-01T${slot.endTime}:00Z`);
    let newStart = new Date(`1970-01-01T${newDate.startTime}:00Z`);
    let newEnd = new Date(`1970-01-01T${newDate.endTime}:00Z`);

    console.log('newStart', newStart, '\n', 'newEnd', newEnd);

    console.log('isExistEnd', isExistEnd, '\n', 'isExistStart', isExistStart);

    if (newStart < isExistEnd && newEnd > isExistStart) {
      throw new ApiError(
        httpStatus.CONFLICT,
        `Time slot conflict: ${data.startTime} - ${data.endTime} overlaps with existing slot ${slot.startTime} - ${slot.endTime}`
      );
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
