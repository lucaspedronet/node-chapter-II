import { Router } from 'express';
import multer from 'multer';

import { uploadConfig } from '@config/upload';
import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController';
import { CreateCarSpecificationController } from '@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController';
import { ListAvailableCarsControllers } from '@modules/cars/useCases/listAvailableCars/ListAvailableCarsControllers';
import { UploadCarImageController } from '@modules/cars/useCases/uploadCarImage/UploadCarImageController';

import { ensureAdmin } from '../middleware/ensureAdmin';
import { ensureAuthenticated } from '../middleware/ensureAuthenticated';

const carsRouter = Router();

const upload = multer(uploadConfig.update('./temp/cars'));

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsControllers();
const createCarSpecificationController = new CreateCarSpecificationController();
const uploadCarImageController = new UploadCarImageController();

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

carsRouter.post(
  '/specifications/:id',
  ensureAuthenticated, // User is authenticated?
  ensureAdmin, // User is admin?
  createCarSpecificationController.handle
);

carsRouter.post(
  '/images/:carId',
  ensureAuthenticated, // User is authenticated?
  ensureAdmin, // User is admin?
  upload.array('images'), // array de images
  uploadCarImageController.handle
);

export { carsRouter };
