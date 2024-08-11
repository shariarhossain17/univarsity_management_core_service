/*
  Warnings:

  - You are about to drop the `offerdCourse` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "offerdCourse" DROP CONSTRAINT "offerdCourse_academicDepartmentId_fkey";

-- DropForeignKey
ALTER TABLE "offerdCourse" DROP CONSTRAINT "offerdCourse_courseId_fkey";

-- DropForeignKey
ALTER TABLE "offerdCourse" DROP CONSTRAINT "offerdCourse_semesterRegestrationId_fkey";

-- DropTable
DROP TABLE "offerdCourse";

-- CreateTable
CREATE TABLE "offerd_course" (
    "id" TEXT NOT NULL,
    "cretedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "courseId" TEXT NOT NULL,
    "academicDepartmentId" TEXT NOT NULL,
    "semesterRegestrationId" TEXT NOT NULL,

    CONSTRAINT "offerd_course_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "offerd_course" ADD CONSTRAINT "offerd_course_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "offerd_course" ADD CONSTRAINT "offerd_course_academicDepartmentId_fkey" FOREIGN KEY ("academicDepartmentId") REFERENCES "academic_department"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "offerd_course" ADD CONSTRAINT "offerd_course_semesterRegestrationId_fkey" FOREIGN KEY ("semesterRegestrationId") REFERENCES "semesterRegistration"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
