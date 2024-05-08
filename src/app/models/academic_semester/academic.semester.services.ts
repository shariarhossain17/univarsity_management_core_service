import { AcademicSemester, Prisma, PrismaClient } from '@prisma/client';
import { paginationHelpers } from '../../../helper/pagination.helper';
import { IGenericResponse } from '../../../interface/common';
import { IPaginationOptions } from '../../../interface/pagination';
import { IAcademicSemesterFilters } from './academic.semeter.interface';
import { academicSemesterFilterableFields } from './academis.semester.constant';

const prisma = new PrismaClient();

const insertAcademicSemester = async (
  semesterData: AcademicSemester
): Promise<AcademicSemester> => {
  console.log(semesterData);
  const result = await prisma.academicSemester.create({
    data: semesterData,
  });

  return result;
};

const getAllAcademicSemester = async (
  option: IAcademicSemesterFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<AcademicSemester[]>> => {
  const { page, limit, skip } =
    paginationHelpers.calculatePagination(paginationOptions);

  const { searchTerm } = option;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: academicSemesterFilterableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  console.log(andConditions);

  // console.log(searchTerm);
  const whereConditions: Prisma.AcademicSemesterWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.academicSemester.findMany({
    where: whereConditions,
    skip,
    take: limit,
  });

  const totalCount = await prisma.academicSemester.count();

  return {
    meta: {
      page,
      limit,
      total: totalCount,
    },
    data: result,
  };
};

export const academicSemesterService = {
  insertAcademicSemester,
  getAllAcademicSemester,
};
