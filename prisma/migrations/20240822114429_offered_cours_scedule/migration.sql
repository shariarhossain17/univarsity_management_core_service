/*
  Warnings:

  - You are about to drop the column `cretedAt` on the `offered_course_section` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "offered_course_section" DROP COLUMN "cretedAt",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "offeredcourseclasschedule" (
    "id" TEXT NOT NULL,
    "dayOfWeek" TEXT NOT NULL DEFAULT 'Saturday',
    "startTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "offeredCourseSectionId" TEXT NOT NULL,
    "semesterRegistrationId" TEXT NOT NULL,
    "roomId" TEXT NOT NULL,
    "facultyId" TEXT NOT NULL,

    CONSTRAINT "offeredcourseclasschedule_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "offeredcourseclasschedule" ADD CONSTRAINT "offeredcourseclasschedule_offeredCourseSectionId_fkey" FOREIGN KEY ("offeredCourseSectionId") REFERENCES "offered_course_section"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "offeredcourseclasschedule" ADD CONSTRAINT "offeredcourseclasschedule_semesterRegistrationId_fkey" FOREIGN KEY ("semesterRegistrationId") REFERENCES "semesterRegistration"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "offeredcourseclasschedule" ADD CONSTRAINT "offeredcourseclasschedule_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "rooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "offeredcourseclasschedule" ADD CONSTRAINT "offeredcourseclasschedule_facultyId_fkey" FOREIGN KEY ("facultyId") REFERENCES "faculties"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
