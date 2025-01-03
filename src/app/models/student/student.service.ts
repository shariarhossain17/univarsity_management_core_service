import { Prisma, Student, StudentEnrolledCourse } from '@prisma/client';
import { paginationHelpers } from '../../../helper/pagination.helper';
import { IGenericResponse } from '../../../interface/common';
import { IPaginationOptions } from '../../../interface/pagination';
import prisma from '../../../shared/prisma';
import { studentFilterableField } from './student.constant';
import { IStudentFilerOption } from './student.interface';
import { StudentUtils } from './stuedent.util';

const createStudentService = async (data: Student): Promise<Student> => {
  const result = await prisma.student.create({
    data,
  });

  console.log(result);
  return result;
};

const getAllStudent = async (
  filters: IStudentFilerOption,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<Student[]>> => {
  const { page, limit, skip } =
    paginationHelpers.calculatePagination(paginationOptions);

  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: studentFilterableField.map((field) => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length > 0) {
    andConditions.push({
      AND: Object.keys(filtersData).map((key) => ({
        [key]: {
          equals: (filtersData as any)[key],
        },
      })),
    });
  }
  const whereConditions: Prisma.StudentWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const totalCount = await prisma.student.count();
  const result = await prisma.student.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      paginationOptions.sortBy && paginationOptions.sortOrder
        ? {
            [paginationOptions.sortBy]: paginationOptions.sortOrder,
          }
        : {
            createdAt: 'asc',
          },
    include: {
      academicDepartment: true,
      academicFaculty: true,
      academicSemester: true,
    },
  });

  return {
    meta: {
      page,
      limit,
      total: totalCount,
    },
    data: result,
  };
};

const getSingleStudent = async (id: string): Promise<Student | null> => {
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
const updateStudent = async (
  id: string,
  payload: Partial<Student>
): Promise<Student> => {
  const result = await prisma.student.update({
    where: {
      id,
    },
    data: payload,
  });

  return result;
};

const deleteStudent = async (id: string): Promise<Student> => {
  const result = await prisma.student.delete({
    where: {
      id,
    },
  });

  return result;
};

const getMyCourse = async (
  userId: string,
  filter: {
    courseId?: string | undefined;
    academicSemesterId?: string | undefined;
  }
) => {
  if (!filter.academicSemesterId) {
    const currentSemester = await prisma.academicSemester.findFirst({
      where: {
        isStart: true,
      },
    });
    filter.academicSemesterId = currentSemester?.id;
  }

  const result = await prisma.studentEnrollCourse.findMany({
    where: {
      student: {
        studentId: userId,
      },
      ...filter,
    },
    include: {
      course: true,
    },
  });

  return result;
};

const getMyCourseSchedule = async (
  userId: string,
  filter: {
    courseId?: string | undefined;
    academicSemesterId?: string | undefined;
  }
) => {
  if (!filter.academicSemesterId) {
    const currentSemester = await prisma.academicSemester.findFirst({
      where: {
        isStart: true,
      },
    });
    filter.academicSemesterId = currentSemester?.id;
  }

  const studentEnrollCourse = await getMyCourse(userId, filter);

  const studentEnrollCoursesIds = studentEnrollCourse.map(
    (item) => item.courseId
  );

  const result = await prisma.studentSemesterRegistrationCourese.findMany({
    where: {
      student: {
        studentId: userId,
      },
      semesterRegistration: {
        academicSemester: {
          id: filter.academicSemesterId,
        },
      },
      offeredCoures: {
        Courses: {
          id: {
            in: studentEnrollCoursesIds,
          },
        },
      },
    },
    include: {
      offeredCoures: {
        include: {
          Courses: true,
        },
      },
      offeredCourseSection: {
        include: {
          offeredCourseClassSchedule: {
            include: {
              room: {
                include: {
                  building: true,
                },
              },
              faculty: true,
            },
          },
        },
      },
    },
  });

  return result;
};

const getMyAcademicInfo = async (userId: string) => {
  const academicInfo = await prisma.studentAcademicInfo.findFirst({
    where: {
      student: {
        studentId: userId,
      },
    },
  });

  const enrolledCourses = await prisma.studentEnrollCourse.findMany({
    where: {
      student: {
        studentId: userId,
      },
      status: StudentEnrolledCourse.COMPLETED,
    },

    include: {
      course: true,
      academicSemester: true,
    },

    orderBy: {
      createdAt: 'asc',
    },
  });

  const groupByAcademicSemesterData =
    StudentUtils.groupByAcademicSemester(enrolledCourses);

  console.log(groupByAcademicSemesterData);

  return {
    academicInfo,
    courses: groupByAcademicSemesterData,
  };
};

const createStudentFromEvent = async (e: any) => {
  const studentData: Partial<Student> = {
    studentId: e.id,
    firstName: e.name.firstName,
    lastName: e.name.lastName,
    middleName: e.name.middleName,
    email: e.email,
    contactNo: e.contactNo,
    gender: e.gender,
    bloodGroup: e.bloodGroup,
    academicSemesterId: e.academicSemester.syncId,
    academicFacultyId: e.academicFaculty.syncId,
    academicDepartmentId: e.academicDepartment.syncId,
  };

  await createStudentService(studentData as Student);
};
export const studentService = {
  createStudentService,
  getSingleStudent,
  getAllStudent,
  updateStudent,
  deleteStudent,
  getMyCourse,
  getMyCourseSchedule,
  getMyAcademicInfo,
  createStudentFromEvent,
};
