/*
  Warnings:

  - You are about to drop the column `offeredCoursesSectionId` on the `student_semester_registration_courses` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "student_semester_registration_courses" DROP CONSTRAINT "student_semester_registration_courses_offeredCourseId_fkey";

-- DropForeignKey
ALTER TABLE "student_semester_registration_courses" DROP CONSTRAINT "student_semester_registration_courses_offeredCoursesSectio_fkey";

-- DropForeignKey
ALTER TABLE "student_semester_registration_courses" DROP CONSTRAINT "student_semester_registration_courses_semesterRegistration_fkey";

-- DropForeignKey
ALTER TABLE "student_semester_registration_courses" DROP CONSTRAINT "student_semester_registration_courses_studentId_fkey";

-- AlterTable
ALTER TABLE "student_semester_registration_courses" DROP COLUMN "offeredCoursesSectionId";
