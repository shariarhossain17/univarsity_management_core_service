import express from 'express';
import validateRequest from '../../../middlewares/validateRequest';
import { roomController } from './room.controller';
import { roomZodValidation } from './room.zod.validation';

const roomRouter = express.Router();

roomRouter.post(
  '/',
  validateRequest(roomZodValidation.createRoom),
  roomController.createRoom
);
roomRouter.get('/', roomController.gerAllRoom);
roomRouter.get('/:id', roomController.getSIngleRoom);
roomRouter.delete('/:id', roomController.deleteRoom);
roomRouter.patch('/:id', roomController.updateRoom);

export default roomRouter;
