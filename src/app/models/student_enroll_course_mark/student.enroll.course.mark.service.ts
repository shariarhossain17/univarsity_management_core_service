import { ExamType, PrismaClient } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/apiError';
import prisma from '../../../shared/prisma';
import { studentMarkUpdateUtils } from './student.enroll.mark.utils';

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

  let gradeData = studentMarkUpdateUtils.getGrade(mark);
  const result = await prisma.studentEnrolledMark.update({
    where: {
      id: isExistStudent.id,
    },
    data: {
      mark,
      grade: gradeData.grade,
    },
  });

  return result;
};

export const studentEnrolledCourseMarkService = {
  creteStudentEnrollCourseDefaultMark,

  updateMarks,
};
