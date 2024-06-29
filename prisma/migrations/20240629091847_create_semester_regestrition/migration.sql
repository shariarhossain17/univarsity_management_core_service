-- CreateEnum
CREATE TYPE "semesterRegigtrationStatus" AS ENUM ('UPCOMING', 'ONGOING', 'ENDED');

-- CreateTable
CREATE TABLE "semesterRegigtration" (
    "id" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "status" "semesterRegigtrationStatus" NOT NULL DEFAULT 'UPCOMING',
    "minCredit" INTEGER NOT NULL DEFAULT 0,
    "maxCredit" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "acadmicSemesterId" TEXT NOT NULL,

    CONSTRAINT "semesterRegigtration_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "semesterRegigtration" ADD CONSTRAINT "semesterRegigtration_acadmicSemesterId_fkey" FOREIGN KEY ("acadmicSemesterId") REFERENCES "academic_semesters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
