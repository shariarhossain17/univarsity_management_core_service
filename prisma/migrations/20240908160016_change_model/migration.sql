/*
  Warnings:

  - The primary key for the `student_semester_registration_courses` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `student_semester_registration_courses` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "student_semester_registration_courses" DROP CONSTRAINT "student_semester_registration_courses_offeredCourseSection_fkey";

-- AlterTable
ALTER TABLE "student_semester_registration_courses" DROP CONSTRAINT "student_semester_registration_courses_pkey",
DROP COLUMN "id",
ADD COLUMN     "offeredCoursesSectionId" TEXT,
ADD CONSTRAINT "student_semester_registration_courses_pkey" PRIMARY KEY ("semesterRegistrationId", "studentId", "offeredCourseId");

-- AddForeignKey
ALTER TABLE "student_semester_registration_courses" ADD CONSTRAINT "student_semester_registration_courses_offeredCoursesSectio_fkey" FOREIGN KEY ("offeredCoursesSectionId") REFERENCES "offered_course_section"("id") ON DELETE SET NULL ON UPDATE CASCADE;
