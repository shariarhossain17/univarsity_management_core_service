import {
  semesterRegistration,
  semesterRegistrationStatus,
  studnetSemesterRegistration,
} from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/apiError';
import prisma from '../../../shared/prisma';

const insertToDb = async (
  payload: semesterRegistration
): Promise<semesterRegistration> => {
  const isSemesterRegistrationStatus =
    await prisma.semesterRegistration.findFirst({
      where: {
        OR: [
          {
            status: semesterRegistrationStatus.UPCOMING,
          },
          {
            status: semesterRegistrationStatus.UPCOMING,
          },
        ],
      },
    });

  if (isSemesterRegistrationStatus)
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      `there is already  an ${isSemesterRegistrationStatus.status}`
    );
  const result = await prisma.semesterRegistration.create({
    data: payload,
  });

  return result;
};

const getAllSemesterRegistration = async (): Promise<
  semesterRegistration[]
> => {
  const result = await prisma.semesterRegistration.findMany({
    include: {
      academicSemester: true,
    },
  });
  return result;
};
const getSingleSemesterRegistration = async (
  id: string
): Promise<semesterRegistration | null> => {
  const result = await prisma.semesterRegistration.findUnique({
    where: {
      id,
    },
  });
  return result;
};

const deleteSemesterRegistration = async (
  id: string
): Promise<semesterRegistration> => {
  const result = await prisma.semesterRegistration.delete({
    where: {
      id,
    },
  });

  return result;
};
const updateSemesterRegistration = async (
  id: string,
  payload: Partial<semesterRegistration>
): Promise<semesterRegistration> => {
  const isExist = await prisma.semesterRegistration.findUnique({
    where: {
      id,
    },
  });

  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, "data is't exist");
  }

  if (
    payload?.status &&
    isExist.status == semesterRegistrationStatus.UPCOMING &&
    payload.status !== semesterRegistrationStatus.ONGOING
  ) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'can only move from UPCOMING to ONGOING '
    );
  }

  if (
    payload?.status &&
    isExist.status == semesterRegistrationStatus.ONGOING &&
    payload.status !== semesterRegistrationStatus.ENDED
  ) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'can only move from ONGOING to ENDED '
    );
  }

  const result = await prisma.semesterRegistration.update({
    where: {
      id,
    },
    data: payload,
    include: {
      academicSemester: true,
    },
  });

  return result;
};

const startMyRegistration = async (
  authUserId: string
): Promise<{
  semesterRegistration: semesterRegistration | null;
  studentRegistration: studnetSemesterRegistration | null;
}> => {
  const studentInfo = await prisma.student.findFirst({
    where: {
      studentId: authUserId,
    },
  });

  if (!studentInfo) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'student info not found');
  }

  const semesterRegistrationInfo = await prisma.semesterRegistration.findFirst({
    where: {
      status: {
        in: [
          semesterRegistrationStatus.ONGOING,
          semesterRegistrationStatus.UPCOMING,
        ],
      },
    },
  });

  if (
    semesterRegistrationInfo?.status === semesterRegistrationStatus.UPCOMING
  ) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Registration is not started yet'
    );
  }

  let studentRegistration = await prisma.studnetSemesterRegistration.findFirst({
    where: {
      student: {
        id: studentInfo?.id,
      },
      semesterRegistration: {
        id: semesterRegistrationInfo?.id,
      },
    },
  });
  if (!studentRegistration) {
    studentRegistration = await prisma.studnetSemesterRegistration.create({
      data: {
        student: {
          connect: {
            id: studentInfo?.id,
          },
        },
        semesterRegistration: {
          connect: {
            id: semesterRegistrationInfo?.id,
          },
        },
      },
    });
  }
  return {
    semesterRegistration: semesterRegistrationInfo,
    studentRegistration: studentRegistration,
  };
};

const studentSemesterRegistrationCourse = async (
  userId: string,
  payload: {
    offeredCourseId: string;
    offeredCourseSectionId: string;
  }
) => {
  const student = await prisma.student.findFirst({
    where: {
      studentId: userId,
    },
  });

  if (!student) {
    throw new ApiError(404, 'student not found');
  }

  const semesterRegistration = await prisma.semesterRegistration.findFirst({
    where: {
      status: semesterRegistrationStatus.ONGOING,
    },
  });

  if (!semesterRegistration) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'semesterRegistration not found'
    );
  }

  const enrollCourse = await prisma.studentSemesterRegistrationCourese.create({
    data: {
      studentId: student?.id,
      semesterRegistrationId: semesterRegistration?.id,
      offeredCourseId: payload?.offeredCourseId,
      offeredCourseSectionId: payload?.offeredCourseSectionId,
    },
  });

  return enrollCourse;
};
export const semesterRegistrationService = {
  insertToDb,
  deleteSemesterRegistration,
  getAllSemesterRegistration,
  getSingleSemesterRegistration,
  updateSemesterRegistration,
  startMyRegistration,
  studentSemesterRegistrationCourse,
};
