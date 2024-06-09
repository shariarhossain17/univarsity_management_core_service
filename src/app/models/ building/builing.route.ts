import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../../middlewares/auth';
import validateRequest from '../../../middlewares/validateRequest';
import { buildingController } from './building.controlloer';
import { buildingZodValidation } from './building.zod.validation';

const buildingRouter = express.Router();

buildingRouter.post(
  '/',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  validateRequest(buildingZodValidation.createBuilding),
  buildingController.createBuilding
);
buildingRouter.get('/', buildingController.getAllBuilding);
buildingRouter.get('/:id', buildingController.getSingleBuilding);
buildingRouter.delete('/:id', buildingController.deleteBuilding);
buildingRouter.patch(
  '/:id',

  validateRequest(buildingZodValidation.updateBuilding),
  buildingController.updateBuilding
);
export default buildingRouter;
