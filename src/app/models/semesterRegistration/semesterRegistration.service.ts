import {
  Course,
  StudentEnrolledCourse,
  offeredCourse,
  semesterRegistration,
  semesterRegistrationStatus,
  studentSemesterRegistrationCourese,
  studnetSemesterRegistration,
} from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/apiError';
import prisma from '../../../shared/prisma';
import { asyncForEach } from '../../../shared/utils';
import { makeStudentPaymentService } from '../studentPayment/student.payment.service';
import { studentEnrolledCourseMarkService } from '../student_enroll_course_mark/student.enroll.course.mark.service';
import { semesterRegistrationUtils } from './semesterRegistration.utils';

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

  const semesterRegistration = await prisma.semesterRegistration.findFirst({
    where: {
      status: semesterRegistrationStatus.ONGOING,
    },
  });

  const offeredCourse = await prisma.offeredCourse.findFirst({
    where: {
      id: payload.offeredCourseId,
    },
    include: {
      Courses: true,
    },
  });

  const offeredCourseSection = await prisma.offeredCoursesSection.findFirst({
    where: {
      id: payload.offeredCourseSectionId,
    },
  });

  if (!student) {
    throw new ApiError(httpStatus.NOT_FOUND, 'student not found');
  }

  if (!semesterRegistration) {
    throw new ApiError(httpStatus.NOT_FOUND, 'semesterRegistration not found');
  }

  if (!offeredCourse) {
    throw new ApiError(httpStatus.NOT_FOUND, 'offeredCourse not found');
  }

  if (!offeredCourseSection) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      'offered course section not found'
    );
  }

  if (
    offeredCourseSection.maxCapacity &&
    offeredCourseSection.currnetEnrolment &&
    offeredCourseSection.currnetEnrolment >= offeredCourseSection.maxCapacity
  ) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'student capacity is full');
  }

  await prisma.$transaction(async (transaction) => {
    await transaction.studentSemesterRegistrationCourese.create({
      data: {
        studentId: student?.id,
        semesterRegistrationId: semesterRegistration?.id,
        offeredCourseId: payload?.offeredCourseId,
        offeredCourseSectionId: payload?.offeredCourseSectionId,
      },
    });

    await transaction.offeredCoursesSection.update({
      where: {
        id: payload.offeredCourseSectionId,
      },
      data: {
        currnetEnrolment: {
          increment: 1,
        },
      },
    });

    await transaction.studnetSemesterRegistration.updateMany({
      where: {
        student: {
          id: student.id,
        },
        semesterRegistration: {
          id: semesterRegistration.id,
        },
      },
      data: {
        totalCreditTaken: {
          increment: offeredCourse.Courses.credits,
        },
      },
    });
  });

  return 'course registration successfully ';
};

const withdrawCourse = async (
  userId: string,
  payload: {
    offeredCourseId: string;
    offeredCourseSectionId: string;
  }
): Promise<string> => {
  const student = await prisma.student.findFirst({
    where: {
      studentId: userId,
    },
  });

  const semesterRegistration = await prisma.semesterRegistration.findFirst({
    where: {
      status: semesterRegistrationStatus.ONGOING,
    },
  });

  const offeredCourse = await prisma.offeredCourse.findFirst({
    where: {
      id: payload.offeredCourseId,
    },
    include: {
      Courses: true,
    },
  });

  if (!student) {
    throw new ApiError(httpStatus.NOT_FOUND, 'student not found');
  }

  if (!semesterRegistration) {
    throw new ApiError(httpStatus.NOT_FOUND, 'semesterRegistration not found');
  }

  if (!offeredCourse) {
    throw new ApiError(httpStatus.NOT_FOUND, 'offeredCourse not found');
  }

  await prisma.$transaction(async (transaction) => {
    await transaction.studentSemesterRegistrationCourese.delete({
      where: {
        semesterRegistrationId_studentId_offeredCourseId: {
          semesterRegistrationId: semesterRegistration?.id,
          studentId: student?.id,
          offeredCourseId: payload?.offeredCourseId,
        },
      },
    });

    await transaction.offeredCoursesSection.update({
      where: {
        id: payload.offeredCourseSectionId,
      },
      data: {
        currnetEnrolment: {
          decrement: 1,
        },
      },
    });

    await transaction.studnetSemesterRegistration.updateMany({
      where: {
        student: {
          id: student.id,
        },
        semesterRegistration: {
          id: semesterRegistration.id,
        },
      },
      data: {
        totalCreditTaken: {
          decrement: offeredCourse.Courses.credits,
        },
      },
    });
  });

  return 'course registration successfully ';
};

const confirmMyCourse = async (userId: string): Promise<string> => {
  const semesterRegistration = await prisma.semesterRegistration.findFirst({
    where: {
      status: semesterRegistrationStatus.ONGOING,
    },
  });

  const studentSemesterRegistration =
    await prisma.studnetSemesterRegistration.findFirst({
      where: {
        student: {
          studentId: userId,
        },
        semesterRegistration: {
          id: semesterRegistration?.id,
        },
      },
    });

  if (!startMyRegistration) {
    throw new ApiError(httpStatus.NOT_FOUND, 'no registration yet');
  }

  if (studentSemesterRegistration?.totalCreditTaken == 0) {
    throw new ApiError(httpStatus.NOT_FOUND, 'you are not enroll any course');
  }

  if (
    studentSemesterRegistration?.totalCreditTaken &&
    semesterRegistration?.maxCredit &&
    semesterRegistration.minCredit &&
    studentSemesterRegistration?.totalCreditTaken >
      semesterRegistration?.maxCredit &&
    studentSemesterRegistration?.totalCreditTaken <
      semesterRegistration?.minCredit
  ) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      `${semesterRegistration.minCredit} to ${semesterRegistration.maxCredit}`
    );
  }

  await prisma.studnetSemesterRegistration.update({
    where: {
      id: studentSemesterRegistration?.id,
    },
    data: {
      isConfirmed: true,
    },
  });

  return 'course confirm success';
};

const getMyCourse = async (userId: string) => {
  const semesterRegistration = await prisma.semesterRegistration.findFirst({
    where: {
      status: semesterRegistrationStatus.ONGOING,
    },
  });

  const studnetSemesterRegistration =
    await prisma.studnetSemesterRegistration.findFirst({
      where: {
        semesterRegistration: {
          id: semesterRegistration?.id,
        },
        student: {
          studentId: userId,
        },
      },
      include: {
        semesterRegistration: true,
        student: true,
      },
    });

  return studnetSemesterRegistration;
};

const startMyCourse = async (id: string) => {
  const semester = await prisma.semesterRegistration.findFirst({
    where: {
      id: id,
    },
    include: {
      academicSemester: true,
    },
  });

  if (!semester) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'semester not found');
  }

  // if (semester.status != semesterRegistrationStatus.ENDED) {
  //   throw new ApiError(
  //     httpStatus.BAD_REQUEST,
  //     'semester registration is not ended yet'
  //   );
  // }

  // if (semester.academicSemester.isStart) {
  //   throw new ApiError(httpStatus.BAD_REQUEST, 'semester already started');
  // }

  let result = await prisma.$transaction(async (pt) => {
    await pt.academicSemester.updateMany({
      where: {
        isStart: true,
      },

      data: {
        isStart: false,
      },
    });

    await pt.academicSemester.update({
      where: {
        id: semester.academicSemester.id,
      },
      data: {
        isStart: true,
      },
    });

    const studentSemesterRegistration =
      await pt.studnetSemesterRegistration.findMany({
        where: {
          semesterRegistration: {
            id,
          },
          isConfirmed: true,
        },
      });

    await asyncForEach(
      studentSemesterRegistration,
      async (studentSemReg: studnetSemesterRegistration) => {
        if (studentSemReg.totalCreditTaken) {
          const totalMoney = studentSemReg.totalCreditTaken * 5000;

          const r = await makeStudentPaymentService.makeStudentPayment(pt, {
            totalMoney: totalMoney,
            studentId: studentSemReg.studentId,
            academicSemesterId: semester.acadmicSemesterId,
          });
        }

        const studentSemesterRegistrationCourses =
          await prisma.studentSemesterRegistrationCourese.findMany({
            where: {
              semesterRegistration: {
                id,
              },
              student: {
                id: studentSemReg.studentId,
              },
            },
            include: {
              offeredCoures: {
                include: {
                  Courses: true,
                },
              },
            },
          });

        await asyncForEach(
          studentSemesterRegistrationCourses,
          async (
            item: studentSemesterRegistrationCourese & {
              offeredCoures: offeredCourse & {
                Courses: Course;
              };
            }
          ) => {
            const enrollCourseData = {
              studentId: item.studentId,
              courseId: item.offeredCoures.courseId,
              academicSemesterId: semester.acadmicSemesterId,
            };

            const isExistEnrollData = await pt.studentEnrollCourse.findFirst({
              where: {
                studentId: item.studentId,
                courseId: item.offeredCoures.courseId,
                academicSemesterId: semester.acadmicSemesterId,
              },
            });

            if (!isExistEnrollData) {
              const studentEnrollCourseData =
                await pt.studentEnrollCourse.create({
                  data: {
                    studentId: item.studentId,
                    courseId: item.offeredCoures.courseId,
                    academicSemesterId: semester.acadmicSemesterId,
                  },
                });

              await studentEnrolledCourseMarkService.creteStudentEnrollCourseDefaultMark(
                pt,
                {
                  studentId: item.studentId,
                  studentEnrollCourseId: studentEnrollCourseData.id,
                  academicSemesterId: semester.acadmicSemesterId,
                }
              );
            }
          }
        );
      }
    );
  });

  return 'semester start successfully';
};

const getSemesterRegCourse = async (auUserId: string) => {
  const student = await prisma.student.findFirst({
    where: {
      studentId: auUserId,
    },
  });

  const semesterRegistration = await prisma.semesterRegistration.findFirst({
    where: {
      status: {
        in: [
          semesterRegistrationStatus.ONGOING,
          semesterRegistrationStatus.UPCOMING,
        ],
      },
    },
    include: {
      academicSemester: true,
    },
  });

  if (!semesterRegistration) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'semester registration not found'
    );
  }

  const studentCompletedCourse = await prisma.studentEnrollCourse.findMany({
    where: {
      status: StudentEnrolledCourse.COMPLETED,
      student: {
        id: student?.id,
      },
    },
    include: {
      course: true,
    },
  });

  const studentCurrentSemesterCourse =
    await prisma.studentSemesterRegistrationCourese.findMany({
      where: {
        student: {
          id: student?.id,
        },
        semesterRegistration: {
          id: semesterRegistration.id,
        },
      },
      include: {
        offeredCoures: true,
        offeredCourseSection: true,
      },
    });

  const offeredCourse = await prisma.offeredCourse.findMany({
    where: {
      semesterRegestration: {
        id: semesterRegistration.id,
      },
      academicDepartment: {
        id: student?.academicDepartmentId,
      },
    },
    include: {
      Courses: {
        include: {
          preRequisite: {
            include: {
              preRequisite: true,
            },
          },
        },
      },
      offerdCoursesSections: {
        include: {
          offeredCourseClassSchedule: {
            include: {
              room: {
                include: {
                  building: true,
                },
              },
            },
          },
        },
      },
    },
  });

  const availableCourse = semesterRegistrationUtils.getAvailableCourse(
    offeredCourse,
    studentCompletedCourse,
    studentCurrentSemesterCourse
  );

  return availableCourse;
};
export const semesterRegistrationService = {
  insertToDb,
  deleteSemesterRegistration,
  getAllSemesterRegistration,
  getSingleSemesterRegistration,
  updateSemesterRegistration,
  startMyRegistration,
  studentSemesterRegistrationCourse,
  withdrawCourse,
  confirmMyCourse,
  getMyCourse,
  startMyCourse,
  getSemesterRegCourse,
};
