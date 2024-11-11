/*
  Warnings:

  - You are about to drop the column `stuedentId` on the `student_academic_info` table. All the data in the column will be lost.
  - Added the required column `studentId` to the `student_academic_info` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "student_academic_info" DROP CONSTRAINT "student_academic_info_stuedentId_fkey";

-- AlterTable
ALTER TABLE "student_academic_info" DROP COLUMN "stuedentId",
ADD COLUMN     "studentId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "student_academic_info" ADD CONSTRAINT "student_academic_info_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
