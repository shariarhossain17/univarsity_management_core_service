export const academicSemesterFilterableFields = [
  'title',
  'code',
  'year',
  'startMonth',
  'endMonth',
  'searchTerm',
];

export const academicSemesterFilterableField = [
  'title',
  'code',
  'startMonth',
  'endMonth',
];

export const validSemesterCode: { [key: string]: string } = {
  Autumn: '01',
  Summer: '02',
  Fall: '03',
};

export const EVENT_ACADEMIC_SEMESTER_CREATED = 'academicSemester.created';
export const EVENT_ACADEMIC_SEMESTER_UPDATED = 'academicSemester.updated';
