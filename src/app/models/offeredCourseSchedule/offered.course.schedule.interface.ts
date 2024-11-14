export type IOfferedCourseScheduleFilterableField = {
  searchTerm?: string | null;
  offeredCourseSectionId?: string | null;
  semesterRegistrationId?: string | null;
  roomId?: string | null;
  facultyId?: string | null;
};

enum WeekDays {
  MONDAY = 'MONDAY',
  TUESDAY = 'TUESDAY',
  WEDNESDAY = 'WEDNESDAY',
  THURSDAY = 'THURSDAY',
  FRIDAY = 'FRIDAY',
  SATURDAY = 'SATURDAY',
  SUNDAY = 'SUNDAY',
}

export type IClassSchedule = {
  startTime: string;
  endTime: string;
  dayOfWeek: WeekDays;
  roomId: string;
  facultyId: string;
};
export type IOfferedSectionCreate = {
  title: string;
  maxCapacity: number;
  offeredCourseId: string;
  semesterRegestrationId: string;
  classSchedules: IClassSchedule[];
};
