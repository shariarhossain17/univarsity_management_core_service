import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../../middlewares/auth';
import validateRequest from '../../../middlewares/validateRequest';
import { roomController } from './room.controller';
import { roomZodValidation } from './room.zod.validation';

const roomRouter = express.Router();

roomRouter.post(
  '/',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  validateRequest(roomZodValidation.createRoom),
  roomController.createRoom
);
roomRouter.get('/', roomController.gerAllRoom);
roomRouter.get('/:id', roomController.getSIngleRoom);
roomRouter.delete('/:id', roomController.deleteRoom);
roomRouter.patch('/:id', roomController.updateRoom);

export default roomRouter;
