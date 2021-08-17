import { UserRepositoryInMemory } from '@modules/Accounts/repositories/fakes-memory/UserRepositoryInMemory';
import { ICreateUser } from '@modules/Accounts/repositories/interfaces/ICreateUser';
import { AppError } from '@shared/errors/AppError';

import { CreateUserUseCase } from '../createUser/CreateUserUseCase';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

let authenticatedUserCase: AuthenticateUserUseCase;
let userRepositoryInMemory: UserRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;
describe('Authenticated User', () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);
    authenticatedUserCase = new AuthenticateUserUseCase(userRepositoryInMemory);
  });

  it('should be to create new user', async () => {
    const user: ICreateUser = {
      name: 'lucas',
      username: 'lucaspedro',
      email: 'lucas@gmail.com',
      password: '123qwe',
      driver_licenses: 'jkl',
    };

    await createUserUseCase.execute(user);

    const userAuthenticated = await authenticatedUserCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(userAuthenticated).toHaveProperty('token');
  });

  it('should not be able to authenticate an nonexistent user', () => {
    expect(async () => {
      await authenticatedUserCase.execute({
        email: 'fake@gmamil.com',
        password: 'fake',
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with incorrect password', () => {
    expect(async () => {
      const user: ICreateUser = {
        name: 'User test Error',
        username: 'error',
        email: 'user@gmail.com',
        password: '123',
        driver_licenses: 'jkl00000',
      };

      await createUserUseCase.execute(user);

      await authenticatedUserCase.execute({
        email: user.email,
        password: 'Incorrect error',
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
