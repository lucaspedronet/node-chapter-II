import { ICreateUser } from './ICreateUser';

interface IUserRepository {
  create(data: ICreateUser): Promise<void>;
}

export { IUserRepository };
