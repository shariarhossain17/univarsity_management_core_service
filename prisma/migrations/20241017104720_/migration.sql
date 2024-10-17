/*
  Warnings:

  - You are about to drop the `studentEnrollCourse` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `studentEnrolledMark` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `studentSemesterPayment` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "studentEnrollCourse" DROP CONSTRAINT "studentEnrollCourse_academicSemesterId_fkey";

-- DropForeignKey
ALTER TABLE "studentEnrollCourse" DROP CONSTRAINT "studentEnrollCourse_courseId_fkey";

-- DropForeignKey
ALTER TABLE "studentEnrollCourse" DROP CONSTRAINT "studentEnrollCourse_studentId_fkey";

-- DropForeignKey
ALTER TABLE "studentEnrolledMark" DROP CONSTRAINT "studentEnrolledMark_academicSemesterId_fkey";

-- DropForeignKey
ALTER TABLE "studentEnrolledMark" DROP CONSTRAINT "studentEnrolledMark_studentEnrollCourseId_fkey";

-- DropForeignKey
ALTER TABLE "studentEnrolledMark" DROP CONSTRAINT "studentEnrolledMark_studentId_fkey";

-- DropForeignKey
ALTER TABLE "studentSemesterPayment" DROP CONSTRAINT "studentSemesterPayment_academicSemesterId_fkey";

-- DropForeignKey
ALTER TABLE "studentSemesterPayment" DROP CONSTRAINT "studentSemesterPayment_studentId_fkey";

-- DropTable
DROP TABLE "studentEnrollCourse";

-- DropTable
DROP TABLE "studentEnrolledMark";

-- DropTable
DROP TABLE "studentSemesterPayment";

-- CreateTable
CREATE TABLE "student_enroll_course" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "academicSemesterId" TEXT NOT NULL,
    "grade" TEXT,
    "point" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "status" "StudentEnrolledCourse" DEFAULT 'ONGOING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "student_enroll_course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "student_enroll_mark" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "studentEnrollCourseId" TEXT NOT NULL,
    "academicSemesterId" TEXT NOT NULL,
    "grade" TEXT,
    "mark" INTEGER,
    "examType" "ExamType" DEFAULT 'MIDTERM',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "student_enroll_mark_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "student_semester_payment" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "academicSemesterId" TEXT NOT NULL,
    "fullPayment" INTEGER NOT NULL DEFAULT 0,
    "partialPayment" INTEGER NOT NULL DEFAULT 0,
    "totalPaidPayment" INTEGER NOT NULL DEFAULT 0,
    "totalDuePayment" INTEGER NOT NULL DEFAULT 0,
    "paymentStatus" "PayementStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "student_semester_payment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "student_enroll_course" ADD CONSTRAINT "student_enroll_course_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_enroll_course" ADD CONSTRAINT "student_enroll_course_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_enroll_course" ADD CONSTRAINT "student_enroll_course_academicSemesterId_fkey" FOREIGN KEY ("academicSemesterId") REFERENCES "academic_semesters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_enroll_mark" ADD CONSTRAINT "student_enroll_mark_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_enroll_mark" ADD CONSTRAINT "student_enroll_mark_studentEnrollCourseId_fkey" FOREIGN KEY ("studentEnrollCourseId") REFERENCES "student_enroll_course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_enroll_mark" ADD CONSTRAINT "student_enroll_mark_academicSemesterId_fkey" FOREIGN KEY ("academicSemesterId") REFERENCES "academic_semesters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_semester_payment" ADD CONSTRAINT "student_semester_payment_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_semester_payment" ADD CONSTRAINT "student_semester_payment_academicSemesterId_fkey" FOREIGN KEY ("academicSemesterId") REFERENCES "academic_semesters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
