import { Category } from '@modules/cars/infra/typeorm/entities/Category';

import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from '../interfaces/ICategoriesRepository';

class CategoriesRepositoryInMemory implements ICategoriesRepository {
  private repository: Category[] = [];

  async create({ description, name }: ICreateCategoryDTO): Promise<void> {
    const newCategory = new Category();

    Object.assign(newCategory, {
      description,
      name,
    });

    await this.repository.push(newCategory);
  }

  async findByName(name: string): Promise<Category> {
    const category = await this.repository.find(
      (category) => category.name === name
    );

    return category;
  }

  async list(): Promise<Category[]> {
    const listCategories = await this.repository;

    return listCategories;
  }
}

export { CategoriesRepositoryInMemory };
