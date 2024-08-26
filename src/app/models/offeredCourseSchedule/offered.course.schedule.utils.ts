import { offeredCourseClassSchedule } from '@prisma/client';
import { ISlotBooked } from './offered.course.schedule.interface';

export const schedule = (data: offeredCourseClassSchedule): ISlotBooked => {
  const newDate = {
    startTime: data.startTime,
    endTime: data.endTime,
    dayOfWeek: data.dayOfWeek,
  };
  return newDate;
};

export const bookedSchedule = (
  booked: offeredCourseClassSchedule[]
): ISlotBooked[] => {
  const isBooked = booked.map(b => ({
    startTime: b.startTime,
    endTime: b.endTime,
    dayOfWeek: b.dayOfWeek,
  }));
  return isBooked;
};
