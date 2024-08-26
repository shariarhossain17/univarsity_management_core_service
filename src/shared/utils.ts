import { ITimeDate } from '../app/models/offeredCourseSchedule/offered.course.schedule.interface';

export const asyncForEach = async (array: any[], callback: any) => {
  if (!Array.isArray(array)) {
    throw new Error('Expected an array');
  }
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
};

export const isTimeChecked = (
  isBooked: ITimeDate[],
  newDate: ITimeDate
): boolean => {
  for (const slot of isBooked) {
    let isExistStart = new Date(`1970-01-01T${slot.startTime}:00Z`);
    let isExistEnd = new Date(`1970-01-01T${slot.endTime}:00Z`);

    let newStart = new Date(`1970-01-01T${newDate.startTime}:00Z`);
    let newEnd = new Date(`1970-01-01T${newDate.endTime}:00Z`);
    if (newStart < isExistEnd && newEnd > isExistStart) {
      return true;
    }
  }

  return false;
};
