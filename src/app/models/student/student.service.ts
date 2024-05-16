import { student } from '@prisma/client';
import prisma from '../../../shared/prisma';

const createStudentService = async (data: student): Promise<student> => {
  const result = await prisma.student.create({
    data,
  });
  return result;
};

const getSingleStudent = async (id: string): Promise<student | null> => {
  const result = await prisma.student.findUnique({
    where: {
      id,
    },
    include: {
      academicDepartment: true,
      academicFaculty: true,
      academicSemester: true,
    },
  });
  return result;
};

export const studentService = {
  createStudentService,
  getSingleStudent,
};
