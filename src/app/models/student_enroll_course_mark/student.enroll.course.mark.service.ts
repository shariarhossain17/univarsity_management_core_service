import { ExamType, PrismaClient } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/apiError';
import prisma from '../../../shared/prisma';

type RestrictedPrismaClient = Omit<
  PrismaClient,
  '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'
>;

const creteStudentEnrollCourseDefaultMark = async (
  prismaClient: RestrictedPrismaClient,
  payload: {
    studentId: string;
    studentEnrollCourseId: string;
    academicSemesterId: string;
  }
) => {
  const isMidTermExist = await prismaClient.studentEnrolledMark.findFirst({
    where: {
      examType: ExamType.MIDTERM,
      student: {
        id: payload.studentId,
      },
      studentEnrollCourese: {
        id: payload.studentEnrollCourseId,
      },
      academicSemeter: {
        id: payload.academicSemesterId,
      },
    },
  });
  const isFinalTermExist = await prismaClient.studentEnrolledMark.findFirst({
    where: {
      examType: ExamType.FINAL,
      student: {
        id: payload.studentId,
      },
      studentEnrollCourese: {
        id: payload.studentEnrollCourseId,
      },
      academicSemeter: {
        id: payload.academicSemesterId,
      },
    },
  });

  if (!isMidTermExist) {
    await prismaClient.studentEnrolledMark.create({
      data: {
        student: {
          connect: {
            id: payload.studentId,
          },
        },
        studentEnrollCourese: {
          connect: {
            id: payload.studentEnrollCourseId,
          },
        },
        academicSemeter: {
          connect: {
            id: payload.academicSemesterId,
          },
        },

        examType: ExamType.MIDTERM,
      },
    });
  }
  if (!isFinalTermExist) {
    await prismaClient.studentEnrolledMark.create({
      data: {
        student: {
          connect: {
            id: payload.studentId,
          },
        },
        studentEnrollCourese: {
          connect: {
            id: payload.studentEnrollCourseId,
          },
        },
        academicSemeter: {
          connect: {
            id: payload.academicSemesterId,
          },
        },

        examType: ExamType.FINAL,
      },
    });
  }
};

const updateMarks = async (payload: any) => {
  const { studentId, academicSemesterId, courseId, examType, mark } = payload;
  const isExistStudent = await prisma.studentEnrolledMark.findFirst({
    where: {
      student: {
        id: studentId,
      },
      academicSemeter: {
        id: academicSemesterId,
      },
      studentEnrollCourese: {
        course: {
          id: courseId,
        },
      },
      examType,
    },
  });

  if (!isExistStudent)
    throw new ApiError(httpStatus.BAD_REQUEST, 'student not exist');

  let grade = '';

  if (mark >= 0 && mark < 40) grade = 'F';
  else if (mark >= 40 && mark < 50) grade = 'D';
  else if (mark >= 50 && mark < 60) grade = 'C';
  else if (mark >= 60 && mark < 70) grade = 'B';
  else if (mark >= 70 && mark < 80) grade = 'A';
  else if (mark >= 80 && mark < 100) grade = 'A+';

  const result = await prisma.studentEnrolledMark.update({
    where: {
      id: isExistStudent.id,
    },
    data: {
      mark,
      grade,
    },
  });

  return result;
};

export const studentEnrolledCourseMarkService = {
  creteStudentEnrollCourseDefaultMark,

  updateMarks,
};
