import { v4 as uuid4 } from 'uuid';

import { Category } from '../../entities/Category';
import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from '../ICategoriesRepository';

class CategoriesRepositoryInMemory implements ICategoriesRepository {
  private repository: Category[] = [];

  async create({ description, name }: ICreateCategoryDTO): Promise<void> {
    const newCategory = new Category();

    Object.assign(newCategory, {
      description,
      name,
      id: uuid4(),
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
