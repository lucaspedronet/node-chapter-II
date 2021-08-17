import { Router } from 'express';

import { authenticateRoutes } from './authenticate.routes';
import { carsRouter } from './cars.routes';
import { categoriesRouters } from './categories.routes';
import { specificationsRoutes } from './specification.routes';
import { userRouter } from './users.routes';

const router = Router();

router.use('/categories', categoriesRouters);
router.use('/cars', carsRouter);
router.use('/specifications', specificationsRoutes);

router.use('/users', authenticateRoutes);
router.use('/users', userRouter);

export { router };
