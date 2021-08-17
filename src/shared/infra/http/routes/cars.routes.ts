import { Router } from 'express';

import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController';

import { ensureAdmin } from '../middleware/ensureAdmin';
import { ensureAuthenticated } from '../middleware/ensureAuthenticated';

const carsRouter = Router();

const createCarController = new CreateCarController();

carsRouter.post(
  '/',
  ensureAuthenticated, // User is authenticated?
  ensureAdmin, // User is admin?
  createCarController.handle
);

export { carsRouter };
