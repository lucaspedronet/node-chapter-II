import { Router } from 'express';
import multer from 'multer';

import { uploadConfig } from '@config/upload';
import { CreateUserController } from '@modules/Accounts/useCases/createUser/CreateUserController';
import { UpdateUserAvatarController } from '@modules/Accounts/useCases/updateUserAvatar/UpdateUserAvatarController';
import { ensureAuthenticated } from '@shared/infra/http/middleware/ensureAuthenticated';

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
