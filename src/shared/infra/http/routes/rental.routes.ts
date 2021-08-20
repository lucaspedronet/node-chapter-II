import { Router } from 'express';

import { CreateRentalController } from '@modules/rentals/useCases/createRentals/CreateRentalController';

import { ensureAuthenticated } from '../middleware/ensureAuthenticated';

const rentalRouter = Router();

const createRentalController = new CreateRentalController();

rentalRouter.post('/', ensureAuthenticated, createRentalController.handle);

export { rentalRouter };
