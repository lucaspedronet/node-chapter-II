import { container } from 'tsyringe';

import { IUserRepository } from '@modules/Accounts/repositories/dtos/IUserRepository';
import { UserRepository } from '@modules/Accounts/repositories/implementations/UserRepository';
import { ICategoriesRepository } from '@modules/cars/repositories/ICategoriesRepository';
import { CategoriesRepository } from '@modules/cars/repositories/implementations/CategoriesRepository';
import { SpecificationRepository } from '@modules/cars/repositories/implementations/SpecificationsRepository';
import { ISpecificationsRepository } from '@modules/cars/repositories/ISpecificationsRepository';
// Users

container.registerSingleton<ICategoriesRepository>(
  'CategoriesRepository',
  CategoriesRepository
);

container.registerSingleton<ISpecificationsRepository>(
  'SpecificationsRepository',
  SpecificationRepository
);

container.registerSingleton<IUserRepository>('UsersRepository', UserRepository);
