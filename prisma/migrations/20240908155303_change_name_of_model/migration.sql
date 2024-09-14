/*
  Warnings:

  - You are about to drop the `studentSemesterRegistrationCourese` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "studentSemesterRegistrationCourese" DROP CONSTRAINT "studentSemesterRegistrationCourese_offeredCourseId_fkey";

-- DropForeignKey
ALTER TABLE "studentSemesterRegistrationCourese" DROP CONSTRAINT "studentSemesterRegistrationCourese_offeredCourseSectionId_fkey";

-- DropForeignKey
ALTER TABLE "studentSemesterRegistrationCourese" DROP CONSTRAINT "studentSemesterRegistrationCourese_semesterRegistrationId_fkey";

-- DropForeignKey
ALTER TABLE "studentSemesterRegistrationCourese" DROP CONSTRAINT "studentSemesterRegistrationCourese_studentId_fkey";

-- DropTable
DROP TABLE "studentSemesterRegistrationCourese";

-- CreateTable
CREATE TABLE "student_semester_registration_courses" (
    "id" TEXT NOT NULL,
    "semesterRegistrationId" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "offeredCourseId" TEXT NOT NULL,
    "offeredCourseSectionId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "student_semester_registration_courses_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "student_semester_registration_courses" ADD CONSTRAINT "student_semester_registration_courses_semesterRegistration_fkey" FOREIGN KEY ("semesterRegistrationId") REFERENCES "semesterRegistration"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_semester_registration_courses" ADD CONSTRAINT "student_semester_registration_courses_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_semester_registration_courses" ADD CONSTRAINT "student_semester_registration_courses_offeredCourseId_fkey" FOREIGN KEY ("offeredCourseId") REFERENCES "offered_course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_semester_registration_courses" ADD CONSTRAINT "student_semester_registration_courses_offeredCourseSection_fkey" FOREIGN KEY ("offeredCourseSectionId") REFERENCES "offered_course_section"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
