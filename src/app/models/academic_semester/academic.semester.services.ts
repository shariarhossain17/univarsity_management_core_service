import { AcademicSemester, PrismaClient } from '@prisma/client';
import { paginationHelpers } from '../../../helper/pagination.helper';
import { IGenericResponse } from '../../../interface/common';
import { IPaginationOptions } from '../../../interface/pagination';
import { IAcademicSemesterFilters } from './academic.semeter.interface';

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
  const result = await prisma.academicSemester.findMany({
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
