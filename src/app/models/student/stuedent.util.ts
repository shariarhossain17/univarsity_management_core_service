const groupByAcademicSemester = (data: any) => {
  const groupData = data.reduce((result: any, course: any) => {
    const academicSemester = course.academicSemester;
    const academicSemesterId = academicSemester.id;

    const existingGroup = result.find(
      (group: any) => group.academicSemesterId == academicSemesterId
    );

    if (existingGroup) {
      existingGroup.completeCourses.push({
        id: course.id,
        createAt: course.createAt,
        updateAt: course.updateStudent,
        courseId: course.courseId,
        studentId: course.studentId,
        grade: course.grade,
        point: course.point,
        totalMarks: course.totalMarks,
        course: course.course,
      });
    } else {
      result.push({
        academicSemester,
        completeCourses: [
          {
            id: course.id,
            createAt: course.createAt,
            updateAt: course.updateStudent,
            courseId: course.courseId,
            studentId: course.studentId,
            grade: course.grade,
            point: course.point,
            totalMarks: course.totalMarks,
            course: course.course,
          },
        ],
      });
    }

    return result;
  }, []);

  return groupData;
};

export const StudentUtils = {
  groupByAcademicSemester,
};
