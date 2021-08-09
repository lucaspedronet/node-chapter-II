import { User } from '../../entities/Users';
import { ICreateUser } from './ICreateUser';

interface IUserRepository {
  create(data: ICreateUser): Promise<void>;
  findByEmail(email: string): Promise<User | undefined>;
}

export { IUserRepository };
