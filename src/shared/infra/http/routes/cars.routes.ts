import { Router } from 'express';

import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController';

import { ensureAuthenticated } from '../middleware/ensureAuthenticated';

const carsRouter = Router();

const createCarController = new CreateCarController();

carsRouter.post('/', ensureAuthenticated, createCarController.handle);

export { carsRouter };
