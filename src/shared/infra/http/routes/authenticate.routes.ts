import { Router } from 'express';

import { AuthenticateUserController } from '@modules/accounts/useCases/authenticateUser/AuthenticateUserController';

const authenticateRoutes = Router();

const authenticateUser = new AuthenticateUserController();

authenticateRoutes.post('/sessions', authenticateUser.handle);

export { authenticateRoutes };
