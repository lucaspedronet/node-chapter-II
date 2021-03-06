import { CategoriesRepositoryInMemory } from '@modules/cars/repositories/fakes-memory/CategoriesRepositoryFakeMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateCategoryUseCase } from './CreateCategoryUseCase';

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

describe('Create Category', () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(
      categoriesRepositoryInMemory
    );
  });

  it('should be to create a new category', async () => {
    const category = {
      name: 'Teste category',
      description: 'descrição do test',
    };

    await createCategoryUseCase.execute(category);

    const createdCategory = await categoriesRepositoryInMemory.findByName(
      category.name
    );

    expect(createdCategory).toHaveProperty('id');
  });

  it('should be to create a new category with name exists', async () => {
    expect(async () => {
      const category = {
        name: 'Teste category',
        description: 'descrição do test',
      };

      await createCategoryUseCase.execute(category);
      await createCategoryUseCase.execute(category);
    }).rejects.toBeInstanceOf(AppError);
  });
});
