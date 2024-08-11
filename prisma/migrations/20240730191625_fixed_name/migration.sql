/*
  Warnings:

  - You are about to drop the `offerd_course` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "offerd_course" DROP CONSTRAINT "offerd_course_academicDepartmentId_fkey";

-- DropForeignKey
ALTER TABLE "offerd_course" DROP CONSTRAINT "offerd_course_courseId_fkey";

-- DropForeignKey
ALTER TABLE "offerd_course" DROP CONSTRAINT "offerd_course_semesterRegestrationId_fkey";

-- DropTable
DROP TABLE "offerd_course";

-- CreateTable
CREATE TABLE "offered_course" (
    "id" TEXT NOT NULL,
    "cretedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "courseId" TEXT NOT NULL,
    "academicDepartmentId" TEXT NOT NULL,
    "semesterRegestrationId" TEXT NOT NULL,

    CONSTRAINT "offered_course_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "offered_course" ADD CONSTRAINT "offered_course_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "offered_course" ADD CONSTRAINT "offered_course_academicDepartmentId_fkey" FOREIGN KEY ("academicDepartmentId") REFERENCES "academic_department"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "offered_course" ADD CONSTRAINT "offered_course_semesterRegestrationId_fkey" FOREIGN KEY ("semesterRegestrationId") REFERENCES "semesterRegistration"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
