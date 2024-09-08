-- CreateTable
CREATE TABLE "studentSemesterRegistrationCourese" (
    "id" TEXT NOT NULL,
    "semesterRegistrationId" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "offeredCourseId" TEXT NOT NULL,
    "offeredCourseSectionId" TEXT NOT NULL,

    CONSTRAINT "studentSemesterRegistrationCourese_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "studentSemesterRegistrationCourese" ADD CONSTRAINT "studentSemesterRegistrationCourese_semesterRegistrationId_fkey" FOREIGN KEY ("semesterRegistrationId") REFERENCES "semesterRegistration"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "studentSemesterRegistrationCourese" ADD CONSTRAINT "studentSemesterRegistrationCourese_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "studentSemesterRegistrationCourese" ADD CONSTRAINT "studentSemesterRegistrationCourese_offeredCourseId_fkey" FOREIGN KEY ("offeredCourseId") REFERENCES "offered_course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "studentSemesterRegistrationCourese" ADD CONSTRAINT "studentSemesterRegistrationCourese_offeredCourseSectionId_fkey" FOREIGN KEY ("offeredCourseSectionId") REFERENCES "offered_course_section"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
