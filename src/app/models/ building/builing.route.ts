import express from 'express';
import validateRequest from '../../../middlewares/validateRequest';
import { buildingController } from './building.controlloer';
import { buildingZodValidation } from './building.zod.validation';

const buildingRouter = express.Router();

buildingRouter.post(
  '/',
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
