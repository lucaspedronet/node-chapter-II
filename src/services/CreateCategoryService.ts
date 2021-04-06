import { CategoriesRepository } from '../repositories/CategoriesRepository';
/**
 * [*] - Definir tipo de retorno
 * [*] - Alterar o retorno do erro
 * [*] - Acessar o repositório
 */

interface IRequestDTO {
  name: string;
  description: string;
}

class CreateCategoryService {
  constructor(private categoriesRepository: CategoriesRepository) {}

  execute({ description, name }: IRequestDTO): void {
    const categoryAlreadyExist = this.categoriesRepository.findByName(name);

    if (categoryAlreadyExist) {
      throw new Error('Category Already exist!');
    }

    this.categoriesRepository.crete({ name, description });
  }
}

export { CreateCategoryService };
