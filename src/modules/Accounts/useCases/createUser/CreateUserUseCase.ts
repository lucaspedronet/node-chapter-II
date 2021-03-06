import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';

import { ICreateUser } from '@modules/accounts/repositories/interfaces/ICreateUser';
import { IUserRepository } from '@modules/accounts/repositories/interfaces/IUserRepository';
import { AppError } from '@shared/errors/AppError';

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
    driver_licenses,
  }: ICreateUser): Promise<void> {
    const userAlreadyExist = await this.usersRepository.findByEmail(email);

    if (userAlreadyExist) {
      throw new AppError('Email already exist!');
    }

    const passwordHash = await hash(password, 8);

    await this.usersRepository.create({
      name,
      email,
      username,
      password: passwordHash,
      driver_licenses,
    });
  }
}

export { CreateUserUseCase };
