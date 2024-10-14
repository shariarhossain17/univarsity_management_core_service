-- CreateEnum
CREATE TYPE "ExamType" AS ENUM ('MIDTERM', 'FINAL');

-- CreateTable
CREATE TABLE "studentEnrolledMark" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "studentEnrollCourseId" TEXT NOT NULL,
    "academicSemesterId" TEXT NOT NULL,
    "grade" TEXT,
    "mark" INTEGER,
    "examType" "ExamType" DEFAULT 'MIDTERM',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "studentEnrolledMark_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "studentEnrolledMark" ADD CONSTRAINT "studentEnrolledMark_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "studentEnrolledMark" ADD CONSTRAINT "studentEnrolledMark_studentEnrollCourseId_fkey" FOREIGN KEY ("studentEnrollCourseId") REFERENCES "studentEnrollCourse"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "studentEnrolledMark" ADD CONSTRAINT "studentEnrolledMark_academicSemesterId_fkey" FOREIGN KEY ("academicSemesterId") REFERENCES "academic_semesters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
