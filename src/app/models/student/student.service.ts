import { student } from '@prisma/client';
import prisma from '../../../shared/prisma';

const createStudentService = async (data: student): Promise<student> => {
  const result = await prisma.student.create({
    data,
  });
  return result;
};

export const studentService = {
  createStudentService,
};
