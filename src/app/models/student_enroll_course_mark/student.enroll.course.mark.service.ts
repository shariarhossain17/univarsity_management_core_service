import { ExamType, PrismaClient } from '@prisma/client';

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

export const studentEnrolledCourseMarkService = {
  creteStudentEnrollCourseDefaultMark,
};
