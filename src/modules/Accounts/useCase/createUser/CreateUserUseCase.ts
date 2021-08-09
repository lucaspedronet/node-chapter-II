import { inject, injectable } from 'tsyringe';

import { ICreateUser } from '../../repositories/dtos/ICreateUser';
import { IUserRepository } from '../../repositories/dtos/IUserRepository';

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository
  ) {}

  async execute({
    name,
    email,
    username,
    password,
    driverLicenses,
  }: ICreateUser): Promise<void> {
    await this.usersRepository.create({
      name,
      email,
      username,
      password,
      driverLicenses,
    });
  }
}

export { CreateUserUseCase };
