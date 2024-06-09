import { Building } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsynch';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { buildingService } from './building.service';
import { buildingFilterableField } from './builiding.constant';

const createBuilding = catchAsync(async (req: Request, res: Response) => {
  const result = await buildingService.createBuilding(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'building create success',
    data: result,
  });
});

const getAllBuilding = catchAsync(async (req: Request, res: Response) => {
  const option = pick(req.query, buildingFilterableField);
  const paginationOptions = pick(req.query, paginationFields);
  const result = await buildingService.getAllBuilding(
    option,
    paginationOptions
  );
  sendResponse<Building[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'building data retrieve success',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleBuilding = catchAsync(async (req: Request, res: Response) => {
  const result = await buildingService.getSingleBuilding(req.params.id);
  sendResponse<Building | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'building retrieve success',
    data: result,
  });
});
const deleteBuilding = catchAsync(async (req: Request, res: Response) => {
  const result = await buildingService.deleteBuilding(req.params.id);
  sendResponse<Building>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'building delete success',
    data: result,
  });
});

const updateBuilding = catchAsync(async (req: Request, res: Response) => {
  const result = await buildingService.updateBuilding(req.params.id, req.body);
  sendResponse<Building>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'building update success',
    data: result,
  });
});

export const buildingController = {
  createBuilding,
  getAllBuilding,
  getSingleBuilding,
  updateBuilding,
  deleteBuilding,
};
