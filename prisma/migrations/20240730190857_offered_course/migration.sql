-- CreateTable
CREATE TABLE "offerdCourse" (
    "id" TEXT NOT NULL,
    "cretedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "courseId" TEXT NOT NULL,
    "academicDepartmentId" TEXT NOT NULL,
    "semesterRegestrationId" TEXT NOT NULL,

    CONSTRAINT "offerdCourse_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "offerdCourse" ADD CONSTRAINT "offerdCourse_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "offerdCourse" ADD CONSTRAINT "offerdCourse_academicDepartmentId_fkey" FOREIGN KEY ("academicDepartmentId") REFERENCES "academic_department"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "offerdCourse" ADD CONSTRAINT "offerdCourse_semesterRegestrationId_fkey" FOREIGN KEY ("semesterRegestrationId") REFERENCES "semesterRegistration"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
