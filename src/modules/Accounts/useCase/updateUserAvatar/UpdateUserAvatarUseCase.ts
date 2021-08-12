import { inject, injectable } from 'tsyringe';

import { IUpdateUserAvatar } from '@modules/Accounts/repositories/interfaces/IUpdateUserAvatar';
import { IUserRepository } from '@modules/Accounts/repositories/interfaces/IUserRepository';
import { deleteFile } from '@utils/file';

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
