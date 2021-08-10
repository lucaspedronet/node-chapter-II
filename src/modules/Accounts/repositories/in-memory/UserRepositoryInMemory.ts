import { v4 as uuid4 } from 'uuid';

import { User } from '@modules/Accounts/entities/Users';

import { ICreateUser } from '../dtos/ICreateUser';
import { IUserRepository } from '../dtos/IUserRepository';

class UserRepositoryInMemory implements IUserRepository {
  private userRepository: User[] = [];

  async create({
    name,
    username,
    email,
    password,
    driver_licenses,
  }: ICreateUser): Promise<void> {
    const newUser = new User();

    Object.assign(newUser, {
      id: uuid4(),
      name,
      username,
      email,
      password,
      driver_licenses,
    });

    await this.userRepository.push(newUser);
  }

  async findByEmail(email: string): Promise<User> {
    const userExist = await this.userRepository.find(
      (user) => user.email === email
    );

    return userExist;
  }

  async findById(userId: string): Promise<User> {
    const userExist = await this.userRepository.find(
      (user) => user.id === userId
    );

    return userExist;
  }
}

export { UserRepositoryInMemory };
