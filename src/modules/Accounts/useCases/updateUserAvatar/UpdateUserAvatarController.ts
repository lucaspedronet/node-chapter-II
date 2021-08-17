import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateUserAvatarUseCase } from './UpdateUserAvatarUseCase';

class UpdateUserAvatarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const avatarFile = request.file.filename;
    const { userId } = request.user;

    console.log(request.file);

    const updateUserAvatar = container.resolve(UpdateUserAvatarUseCase);
    await updateUserAvatar.execute({ userId, avatarFile });

    return response.status(204).send();
  }
}

export { UpdateUserAvatarController };
