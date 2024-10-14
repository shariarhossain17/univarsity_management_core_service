-- CreateEnum
CREATE TYPE "PayementStatus" AS ENUM ('PENDING', 'PARTIAL_PAID', 'FULL_PAID');

-- CreateTable
CREATE TABLE "studentSemesterPayment" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "academicSemesterId" TEXT NOT NULL,
    "fullPayment" INTEGER NOT NULL DEFAULT 0,
    "partialPayment" INTEGER NOT NULL DEFAULT 0,
    "totalPaidPayment" INTEGER NOT NULL DEFAULT 0,
    "paymentStatus" "PayementStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "studentSemesterPayment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "studentSemesterPayment" ADD CONSTRAINT "studentSemesterPayment_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "studentSemesterPayment" ADD CONSTRAINT "studentSemesterPayment_academicSemesterId_fkey" FOREIGN KEY ("academicSemesterId") REFERENCES "academic_semesters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
