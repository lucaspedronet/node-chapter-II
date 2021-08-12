import { getRepository, Repository } from 'typeorm';

import { ICreateUser } from '@modules/Accounts/repositories/interfaces/ICreateUser';
import { IUserRepository } from '@modules/Accounts/repositories/interfaces/IUserRepository';

import { User } from '../entities/Users';

class UserRepository implements IUserRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create({
    name,
    username,
    email,
    driver_licenses,
    password,
    avatar,
    id,
  }: ICreateUser): Promise<void> {
    const user = this.repository.create({
      id,
      name,
      username,
      email,
      driver_licenses,
      password,
      avatar,
    });

    await this.repository.save(user);
  }

  async findById(userId: string): Promise<User> {
    const user = await this.repository.findOne(userId);

    return user;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const userAlreadyExist = await this.repository.findOne({ email });

    return userAlreadyExist;
  }
}

export { UserRepository };
