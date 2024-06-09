import { Prisma, Room } from '@prisma/client';
import { paginationHelpers } from '../../../helper/pagination.helper';
import { IGenericResponse } from '../../../interface/common';
import { IPaginationOptions } from '../../../interface/pagination';
import prisma from '../../../shared/prisma';
import { roomFilters } from './room.interface';

const createRoom = async (data: Room): Promise<Room> => {
  const result = await prisma.room.create({
    data,
    include: {
      building: true,
    },
  });
  return result;
};
const gerAllRoom = async (
  filters: roomFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<Room[]>> => {
  const { page, limit, skip } =
    paginationHelpers.calculatePagination(paginationOptions);

  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: ['title'].map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length > 0) {
    andConditions.push({
      AND: Object.keys(filtersData).map(key => ({
        [key]: {
          equals: (filtersData as any)[key],
        },
      })),
    });
  }

  const whereConditions: Prisma.RoomWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};
  const result = await prisma.room.findMany({
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
  });

  const totalCount = await prisma.room.count();

  return {
    meta: {
      page,
      limit,
      total: totalCount,
    },
    data: result,
  };
};

const getSIngleRoom = async (id: string): Promise<Room | null> => {
  const result = await prisma.room.findUnique({
    where: {
      id: id,
    },
    include: {
      building: true,
    },
  });
  return result;
};
const deleteRoom = async (id: string): Promise<Room> => {
  const result = await prisma.room.delete({
    where: {
      id: id,
    },
    include: {
      building: true,
    },
  });
  return result;
};

const updateRoom = async (
  id: string,
  payload: Partial<Room>
): Promise<Room> => {
  const result = await prisma.room.update({
    where: {
      id: id,
    },
    data: payload,

    include: {
      building: true,
    },
  });
  return result;
};
export const roomService = {
  createRoom,
  gerAllRoom,
  getSIngleRoom,
  deleteRoom,
  updateRoom,
};
