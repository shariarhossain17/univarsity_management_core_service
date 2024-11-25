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

      // console.log(preRequisites)

      if (preRequisites.length == 0) return true;
      else {
        const preRequisiteIds = preRequisites.map(
          (preRequisite: any) => preRequisite.preRequisiteId
        );

        return preRequisiteIds.map((id: string) =>
          completedCoursesId.includes(id)
        );
      }
    })
    .map((course: any) => {
      const isAlreadyTaken = studentCurrentlyCourse.find(
        (c: any) => c.offeredCourseId == course.id
      );

      if (isAlreadyTaken) {
        course.offerdCoursesSections.map((section: any) => {
          if (section.id == isAlreadyTaken.offeredCourseSectionId) {
            section.isTaken = true;
          } else {
            section.isTaken = false;
          }
        });

        return {
          ...course,
          isTaken: true,
        };
      } else {
        course.offerdCoursesSections.map((section: any) => {
          section.isTaken = false;
        });
        return {
          ...course,
          isTaken: false,
        };
      }
    });

  return availableCourseList;
};

export const semesterRegistrationUtils = {
  getAvailableCourse,
};
