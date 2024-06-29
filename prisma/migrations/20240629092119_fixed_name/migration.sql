/*
  Warnings:

  - You are about to drop the `semesterRegigtration` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "semesterRegistrationStatus" AS ENUM ('UPCOMING', 'ONGOING', 'ENDED');

-- DropForeignKey
ALTER TABLE "semesterRegigtration" DROP CONSTRAINT "semesterRegigtration_acadmicSemesterId_fkey";

-- DropTable
DROP TABLE "semesterRegigtration";

-- DropEnum
DROP TYPE "semesterRegigtrationStatus";

-- CreateTable
CREATE TABLE "semesterRegistration" (
    "id" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "status" "semesterRegistrationStatus" NOT NULL DEFAULT 'UPCOMING',
    "minCredit" INTEGER NOT NULL DEFAULT 0,
    "maxCredit" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "acadmicSemesterId" TEXT NOT NULL,

    CONSTRAINT "semesterRegistration_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "semesterRegistration" ADD CONSTRAINT "semesterRegistration_acadmicSemesterId_fkey" FOREIGN KEY ("acadmicSemesterId") REFERENCES "academic_semesters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
