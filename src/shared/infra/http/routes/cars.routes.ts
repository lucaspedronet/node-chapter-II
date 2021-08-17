import { Router } from 'express';

import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController';
import { ListAvailableCarsControllers } from '@modules/cars/useCases/listAvailableCars/ListAvailableCarsControllers';

import { ensureAdmin } from '../middleware/ensureAdmin';
import { ensureAuthenticated } from '../middleware/ensureAuthenticated';

const carsRouter = Router();

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsControllers();

carsRouter.post(
  '/',
  ensureAuthenticated, // User is authenticated?
  ensureAdmin, // User is admin?
  createCarController.handle
);

carsRouter.get(
  '/available',
  ensureAuthenticated, // User is authenticated?
  listAvailableCarsController.handle
);

export { carsRouter };
