import { Category } from '../model/Categories';

interface ICreateCategoryDTO {
  name: string;
  description: string;
}

interface ICategoriesRepository {
  create({ name, description }: ICreateCategoryDTO): void;
  findByName(name: string): Category;
  list(): Category[];
}

export { ICategoriesRepository, ICreateCategoryDTO };
