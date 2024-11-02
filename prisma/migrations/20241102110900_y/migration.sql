-- CreateTable
CREATE TABLE "student_academic_info" (
    "id" TEXT NOT NULL,
    "stuedentId" TEXT NOT NULL,
    "totalCompletedCredit" INTEGER,
    "cgpa" DOUBLE PRECISION DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "student_academic_info_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "student_academic_info" ADD CONSTRAINT "student_academic_info_stuedentId_fkey" FOREIGN KEY ("stuedentId") REFERENCES "students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
