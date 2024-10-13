-- CreateEnum
CREATE TYPE "StudentEnrolledCourse" AS ENUM ('ONGOING', 'COMPLETED', 'WITHDRAWN');

-- CreateTable
CREATE TABLE "studentEnrollCourse" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "academicSemesterId" TEXT NOT NULL,
    "grade" TEXT,
    "point" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "status" "StudentEnrolledCourse" DEFAULT 'ONGOING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "studentEnrollCourse_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "studentEnrollCourse" ADD CONSTRAINT "studentEnrollCourse_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "studentEnrollCourse" ADD CONSTRAINT "studentEnrollCourse_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "studentEnrollCourse" ADD CONSTRAINT "studentEnrollCourse_academicSemesterId_fkey" FOREIGN KEY ("academicSemesterId") REFERENCES "academic_semesters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
