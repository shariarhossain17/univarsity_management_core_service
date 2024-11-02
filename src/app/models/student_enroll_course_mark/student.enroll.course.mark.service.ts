import { ExamType, PrismaClient, StudentEnrolledCourse } from '@prisma/client';
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

const updateFinalMarks = async (payload: any) => {
  const { studentId, academicSemesterId, courseId } = payload;

  const studentEnrollCourese = await prisma.studentEnrollCourse.findFirst({
    where: {
      student: {
        id: studentId,
      },
      academicSemester: {
        id: academicSemesterId,
      },
      course: {
        id: courseId,
      },
    },
  });

  if (!studentEnrollCourese)
    throw new ApiError(httpStatus.BAD_REQUEST, 'student not found');

  const studentEnrolledCourseMarks = await prisma.studentEnrolledMark.findMany({
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
    },
  });

  if (!studentEnrolledCourseMarks.length)
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'student enroll course mark not found'
    );

  const midTermMark = studentEnrolledCourseMarks.find(
    (item) => item.examType === ExamType.MIDTERM
  )?.mark;
  const finalMark = studentEnrolledCourseMarks.find(
    (item) => item.examType === ExamType.FINAL
  )?.mark;

  let totalMarks;
  if (midTermMark && finalMark)
    totalMarks = Math.ceil(midTermMark * 0.4) + Math.ceil(finalMark * 0.6);

  let grade;
  if (totalMarks) grade = studentMarkUpdateUtils.getGrade(totalMarks);

  await prisma.studentEnrollCourse.updateMany({
    where: {
      student: {
        id: studentId,
      },
      academicSemester: {
        id: academicSemesterId,
      },
      course: {
        id: courseId,
      },
    },
    data: {
      grade: grade?.grade,
      point: grade?.point,
      totalMarks: totalMarks,
      status: StudentEnrolledCourse.COMPLETED,
    },
  });

  const grades = await prisma.studentEnrollCourse.findMany({
    where: {
      student: {
        id: studentId,
      },
      status: StudentEnrolledCourse.COMPLETED,
    },
    include: {
      course: true,
    },
  });

  await studentMarkUpdateUtils.geneRateGrades(grades);
};

export const studentEnrolledCourseMarkService = {
  creteStudentEnrollCourseDefaultMark,
  updateFinalMarks,
  updateMarks,
};
