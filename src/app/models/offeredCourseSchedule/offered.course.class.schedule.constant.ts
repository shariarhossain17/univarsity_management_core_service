export const offeredCourseClassScheduleSearch = ['dayOfWeek'];

export const offeredCourseClassScheduleFilter = [
  'offeredCourseSectionId',
  'semesterRegistrationId',
  'facultyId',
  'roomId',
  'searchTerm',
];

export const offeredClassScheduleFiltrableField = [
  'offeredCourseSectionId',
  'semesterRegistrationId',
  'facultyId',
  'roomId',
];

export const offeredClassScheduleMapper: { [key: string]: string } = {
  offeredCourseSectionId: 'offeredCourseSection',
  semesterRegistrationId: 'semesterRegistration',
  facultyId: 'faculty',
  roomId: 'room',
};
