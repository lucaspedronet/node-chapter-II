import { Router } from 'express';
import multer from 'multer';

import { uploadConfig } from '../config/upload';
import { ensureAuthenticated } from '../middleware/ensureAuthenticated';
import { CreateUserController } from '../modules/Accounts/useCase/createUser/CreateUserController';
import { UpdateUserAvatarController } from '../modules/Accounts/useCase/updateUserAvatar/UpdateUserAvatarController';

const userRouter = Router();

const uploadAvatar = multer(uploadConfig.update('./temp/avatar'));

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();

userRouter.post('/', createUserController.handle);

userRouter.patch(
  '/avatar-update',
  ensureAuthenticated, // authenticated
  uploadAvatar.single('avatar'),
  updateUserAvatarController.handle
);

export { userRouter };
