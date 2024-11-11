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

const updateFinalMarks = async (payload: {
  studentId: string;
  academicSemesterId: string;
  courseId: string;
}) => {
  const { studentId, academicSemesterId, courseId } = payload;

  // Find student's enrolled course
  const studentEnrollCourse = await prisma.studentEnrollCourse.findFirst({
    where: {
      student: { id: studentId },
      academicSemester: { id: academicSemesterId },
      course: { id: courseId },
    },
  });

  if (!studentEnrollCourse) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Student not found in enrolled courses'
    );
  }

  // Find student's course marks
  const studentEnrolledCourseMarks = await prisma.studentEnrolledMark.findMany({
    where: {
      student: { id: studentId },
      academicSemeter: { id: academicSemesterId },
      studentEnrollCourese: { course: { id: courseId } },
    },
  });

  if (!studentEnrolledCourseMarks.length) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Student enrolled course marks not found'
    );
  }

  // Calculate marks and grade
  let midTermMark =
    studentEnrolledCourseMarks.find(
      (item) => item.examType === ExamType.MIDTERM
    )?.mark || 0;
  let finalMark =
    studentEnrolledCourseMarks.find((item) => item.examType === ExamType.FINAL)
      ?.mark || 0;
  const totalMarks = Math.ceil(midTermMark * 0.4) + Math.ceil(finalMark * 0.6);

  const grade = totalMarks ? studentMarkUpdateUtils.getGrade(totalMarks) : null;

  // Update enrolled course with final marks and status
  await prisma.studentEnrollCourse.updateMany({
    where: {
      student: { id: studentId },
      academicSemester: { id: academicSemesterId },
      course: { id: courseId },
    },
    data: {
      grade: grade?.grade,
      point: grade?.point,
      totalMarks: totalMarks,
      status: StudentEnrolledCourse.COMPLETED,
    },
  });

  // Calculate overall grades for academic info update
  const grades = await prisma.studentEnrollCourse.findMany({
    where: {
      student: { id: studentId },
      status: StudentEnrolledCourse.COMPLETED,
    },
    include: { course: true },
  });

  const academicResult = await studentMarkUpdateUtils.geneRateGrades(grades);

  // Update academic info for the student
  const studentAcademicInfo = await prisma.studentAcademicInfo.findFirst({
    where: { student: { id: studentId } },
  });

  if (studentAcademicInfo) {
    await prisma.studentAcademicInfo.update({
      where: { id: studentAcademicInfo.id },
      data: {
        totalCompletedCredit: academicResult.completedCredit,
        cgpa: academicResult.totalCgpa,
      },
    });
  } else {
    await prisma.studentAcademicInfo.create({
      data: {
        student: {
          connect: {
            id: studentId,
          },
        },
        totalCompletedCredit: academicResult.completedCredit,
        cgpa: academicResult.totalCgpa,
      },
    });
  }

  return grades;
};

export const studentEnrolledCourseMarkService = {
  creteStudentEnrollCourseDefaultMark,
  updateFinalMarks,
  updateMarks,
};
