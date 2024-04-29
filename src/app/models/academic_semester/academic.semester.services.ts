import { AcademicSemester, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const insertAcademicSemester = async (
  semesterData: AcademicSemester
): Promise<AcademicSemester> => {
  console.log(semesterData);
  const result = await prisma.academicSemester.create({
    data: semesterData,
  });

  return result;
};

export const academicSemesterService = {
  insertAcademicSemester,
};
