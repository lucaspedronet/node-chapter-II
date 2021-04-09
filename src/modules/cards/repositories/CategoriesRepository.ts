import { Category } from '../model/Categories';
import { ICategoriesRepository } from './ICategoriesRepository';
// DTO - Director Transform Object
interface ICreateCategoryDTO {
  description: string;
  name: string;
}

// Singleton - conceito de uma única instância para toda aplicação.
class CategoriesRepository implements ICategoriesRepository {
  private categories: Category[];

  // variável que armazena a instância única
  private static INSTANCE: CategoriesRepository;

  private constructor() {
    this.categories = [];
  }

  // método criador da instância
  public static getInstance(): CategoriesRepository {
    if (!CategoriesRepository.INSTANCE) {
      CategoriesRepository.INSTANCE = new CategoriesRepository();
    }

    return CategoriesRepository.INSTANCE;
  }

  create({ description, name }: ICreateCategoryDTO): void {
    const category = new Category();

    Object.assign(category, {
      name,
      description,
      created_at: new Date(),
    });

    this.categories.push(category);
  }

  list(): Category[] {
    return this.categories;
  }

  findByName(name: string): Category {
    const category = this.categories.find((category) => category.name === name);

    return category;
  }
}

export { CategoriesRepository };
