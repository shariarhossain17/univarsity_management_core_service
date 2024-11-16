import { CourseFaculty, Faculty, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helper/pagination.helper';
import { IGenericResponse } from '../../../interface/common';
import { IPaginationOptions } from '../../../interface/pagination';
import prisma from '../../../shared/prisma';
import { facultyFilterableField } from './faculty.constant';
import { IFacultyFilterOption } from './faculty.interface';

const createFacultytService = async (data: Faculty): Promise<Faculty> => {
  const result = await prisma.faculty.create({
    data,
  });
  return result;
};

const getAllFaculty = async (
  filters: IFacultyFilterOption,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<Faculty[]>> => {
  const { page, limit, skip } =
    paginationHelpers.calculatePagination(paginationOptions);

  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: facultyFilterableField.map((field) => ({
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
  const whereConditions: Prisma.FacultyWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const totalCount = await prisma.faculty.count();
  const result = await prisma.faculty.findMany({
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

const getSingleFaculty = async (id: string): Promise<Faculty | null> => {
  const result = await prisma.faculty.findUnique({
    where: {
      id,
    },
    include: {
      academicDepartment: true,
      academicFaculty: true,
    },
  });
  return result;
};
const updateFaculty = async (
  id: string,
  payload: Partial<Faculty>
): Promise<Faculty> => {
  const result = await prisma.faculty.update({
    where: {
      id,
    },
    data: payload,
  });

  return result;
};

const deleteFaculty = async (id: string): Promise<Faculty> => {
  console.log('hello');
  const result = await prisma.faculty.delete({
    where: {
      id,
    },
  });

  return result;
};

const assignCourses = async (
  id: string,
  payload: string[]
): Promise<CourseFaculty[]> => {
  await prisma.courseFaculty.createMany({
    data: payload.map((courseId) => ({
      facultyId: id,
      courseId: courseId,
    })),
  });

  const res = await prisma.courseFaculty.findMany({
    where: {
      facultyId: id,
    },

    include: {
      course: true,
    },
  });

  return res;
};

const deleteCourses = async (
  id: string,
  payload: string[]
): Promise<CourseFaculty[]> => {
  await prisma.courseFaculty.deleteMany({
    where: {
      facultyId: id,
      courseId: {
        in: payload,
      },
    },
  });
  const res = await prisma.courseFaculty.findMany({
    where: {
      facultyId: id,
    },

    include: {
      course: true,
    },
  });

  return res;
};

const myCourse = async (
  user: { userId: string; role: string },
  filter: {
    academicSemesterId: string | null | undefined;
    courseId: string | null | undefined;
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

  const offeredCourseSections = await prisma.offeredCoursesSection.findMany({
    where: {
      offeredCourseClassSchedule: {
        some: {
          faculty: {
            facultyId: user.userId,
          },
        },
      },
      offeredCourse: {
        semesterRegestration: {
          academicSemester: {
            id: filter.academicSemesterId,
          },
        },
      },
    },
    include: {
      offeredCourse: {
        include: {
          Courses: true,
        },
      },
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
  });
  console.log(offeredCourseSections);
};
export const facultyService = {
  createFacultytService,
  getSingleFaculty,
  getAllFaculty,
  deleteFaculty,
  updateFaculty,
  assignCourses,
  deleteCourses,
  myCourse,
};
