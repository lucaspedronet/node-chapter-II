import { inject, injectable } from 'tsyringe';

import { deleteFile } from '../../../../utils/file';
import { IUpdateUserAvatar } from '../../repositories/dtos/IUpdateUserAvatar';
import { IUserRepository } from '../../repositories/dtos/IUserRepository';

@injectable()
class UpdateUserAvatarUseCase {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUserRepository
  ) {}

  async execute({ userId, avatarFile }: IUpdateUserAvatar): Promise<void> {
    const user = await this.userRepository.findById(userId);

    if (user.avatar) {
      await deleteFile(`./temp/avatar/${user.avatar}`);
    }

    user.avatar = avatarFile;

    console.log(user);

    await this.userRepository.create(user);
  }
}

export { UpdateUserAvatarUseCase };
