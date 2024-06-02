/*
  Warnings:

  - You are about to drop the column `contacNo` on the `faculties` table. All the data in the column will be lost.
  - You are about to drop the column `facutlyId` on the `faculties` table. All the data in the column will be lost.
  - You are about to drop the column `contacNo` on the `students` table. All the data in the column will be lost.
  - You are about to drop the column `facutlyId` on the `students` table. All the data in the column will be lost.
  - Added the required column `contactNo` to the `faculties` table without a default value. This is not possible if the table is not empty.
  - Added the required column `facultyId` to the `faculties` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contactNo` to the `students` table without a default value. This is not possible if the table is not empty.
  - Added the required column `facultyId` to the `students` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "faculties" DROP COLUMN "contacNo",
DROP COLUMN "facutlyId",
ADD COLUMN     "contactNo" TEXT NOT NULL,
ADD COLUMN     "facultyId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "students" DROP COLUMN "contacNo",
DROP COLUMN "facutlyId",
ADD COLUMN     "contactNo" TEXT NOT NULL,
ADD COLUMN     "facultyId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "buildings" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "buildings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rooms" (
    "id" TEXT NOT NULL,
    "roomNumber" TEXT NOT NULL,
    "floor" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "buildingId" TEXT NOT NULL,

    CONSTRAINT "rooms_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "rooms" ADD CONSTRAINT "rooms_buildingId_fkey" FOREIGN KEY ("buildingId") REFERENCES "buildings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
