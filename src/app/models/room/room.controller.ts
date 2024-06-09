import { Room } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';

import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsynch';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { roomFilterableFields } from './room.constant';
import { roomService } from './room.service';

const createRoom = catchAsync(async (req: Request, res: Response) => {
  const result = await roomService.createRoom(req.body);

  sendResponse<Room>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'room create success',
    data: result,
  });
});

const gerAllRoom = catchAsync(async (req: Request, res: Response) => {
  const option = pick(req.query, roomFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);
  const result = await roomService.gerAllRoom(option, paginationOptions);
  sendResponse<Room[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'room data retrieve success',
    meta: result.meta,
    data: result.data,
  });
});

const getSIngleRoom = catchAsync(async (req: Request, res: Response) => {
  const result = await roomService.getSIngleRoom(req.params.id);

  sendResponse<Room>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'room create success',
    data: result,
  });
});

const deleteRoom = catchAsync(async (req: Request, res: Response) => {
  const result = await roomService.deleteRoom(req.params.id);

  sendResponse<Room>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'room delete success',
    data: result,
  });
});

const updateRoom = catchAsync(async (req: Request, res: Response) => {
  const result = await roomService.updateRoom(req.params.id, req.body);

  sendResponse<Room>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'room update success',
    data: result,
  });
});
export const roomController = {
  createRoom,
  gerAllRoom,
  getSIngleRoom,
  deleteRoom,
  updateRoom,
};
