const getGrade = (mark: number) => {
  let result = {
    grade: '',
  };
  if (mark >= 0 && mark < 40) result.grade = 'F';
  else if (mark >= 40 && mark < 50) result.grade = 'D';
  else if (mark >= 50 && mark < 60) result.grade = 'C';
  else if (mark >= 60 && mark < 70) result.grade = 'B';
  else if (mark >= 70 && mark < 80) result.grade = 'A';
  else if (mark >= 80 && mark < 100) result.grade = 'A+';

  return result;
};

export const studentMarkUpdateUtils = {
  getGrade,
};
