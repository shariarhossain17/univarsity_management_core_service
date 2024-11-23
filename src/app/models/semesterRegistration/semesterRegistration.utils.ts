const getAvailableCourse = (
  offeredCourses: any,
  studentCompleteCourse: any,
  studentCurrentlyCourse: any
) => {
  const completedCoursesId = studentCompleteCourse.map(
    (course: any) => course.id
  );

  const availableCourseList = offeredCourses
    .filter(
      (offeredCourse: any) => !completedCoursesId.includes(offeredCourse.id)
    )
    .filter((course: any) => {
      const preRequisites = course.Courses.preRequisite;

      if (preRequisites.length == 0) return true;
      else {
        const preRequisiteIds = preRequisites.map(
          (preRequisite: any) => preRequisite.preRequisiteId
        );

        console.log(preRequisiteIds);
      }
    });

  return null;
};

export const semesterRegistrationUtils = {
  getAvailableCourse,
};
