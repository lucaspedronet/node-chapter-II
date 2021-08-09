import { getRepository, Repository } from 'typeorm';

import { User } from '../../entities/Users';
import { ICreateUser } from '../dtos/ICreateUser';
import { IUserRepository } from '../dtos/IUserRepository';

class UserRepository implements IUserRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }
  async findByEmail(email: string): Promise<User | undefined> {
    const userAlreadyExist = await this.repository.findOne({ email });

    return userAlreadyExist;
  }
  async create({
    name,
    username,
    email,
    driverLicenses,
    password,
  }: ICreateUser): Promise<void> {
    const user = this.repository.create({
      name,
      username,
      email,
      driver_licenses: driverLicenses,
      password,
    });

    await this.repository.save(user);
  }
}

export { UserRepository };
