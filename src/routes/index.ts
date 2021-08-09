import { Router } from 'express';

import { categoriesRouters } from './categories.routes';
import { specificationsRoutes } from './specification.routes';
import { userRouter } from './users.routes';

const router = Router();

router.use('/categories', categoriesRouters);
router.use('/categories', categoriesRouters);
router.use('/specifications', specificationsRoutes);
router.use('/users', userRouter);

export { router };
