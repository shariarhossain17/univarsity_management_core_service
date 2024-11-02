import { Course, StudentEnrolledCourse } from '@prisma/client';

const getGrade = (mark: number) => {
  let result = {
    grade: '',
    point: 0,
  };
  if (mark >= 0 && mark < 40) {
    result.grade = 'F';
    result.point = 0.0;
  } else if (mark >= 40 && mark < 50) {
    result.grade = 'D';
    result.point = 2.0;
  } else if (mark >= 50 && mark < 60) {
    result.grade = 'C';
    result.point = 2.5;
  } else if (mark >= 60 && mark < 70) {
    result.grade = 'B';
    result.point = 3.0;
  } else if (mark >= 70 && mark < 80) {
    result.grade = 'A';
    result.point = 3.5;
  } else if (mark >= 80 && mark < 100) {
    result.grade = 'A+';
    result.point = 4.0;
  }

  return result;
};

const geneRateGrades = (
  payload: (StudentEnrolledCourse & { course: Course })[]
) => {
  let result = {
    totalCompletedCredit: 0,
    cgpa: 0,
  };

  if (!payload.length) {
    result = {
      totalCompletedCredit: 0,
      cgpa: 0,
    };
  }

  let totalCredit = 0;
  let totalCgpa = 0;

  for (const grade of payload) {
    totalCgpa += grade?.point || 0;
    totalCredit += grade?.course.credits;
  }

  let avgCGPA = totalCgpa / payload.length;

  console.log(avgCGPA);
};

export const studentMarkUpdateUtils = {
  getGrade,
  geneRateGrades,
};
