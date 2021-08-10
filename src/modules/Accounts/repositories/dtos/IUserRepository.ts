import { User } from '@modules/Accounts/entities/Users';

import { ICreateUser } from './ICreateUser';

interface IUserRepository {
  create(data: ICreateUser): Promise<void>;
  findByEmail(email: string): Promise<User | undefined>;
  findById(userId: string): Promise<User | undefined>;
}

export { IUserRepository };
