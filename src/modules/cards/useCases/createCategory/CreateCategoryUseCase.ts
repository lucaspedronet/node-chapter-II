import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';
/**
 * [*] - Definir tipo de retorno
 * [*] - Alterar o retorno do erro
 * [*] - Acessar o repositório
 */

interface IRequestDTO {
  name: string;
  description: string;
}

class CreateCategoryUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  execute({ description, name }: IRequestDTO): void {
    const categoryAlreadyExist = this.categoriesRepository.findByName(name);

    if (categoryAlreadyExist) {
      throw new Error('Category Already exist!');
    }

    this.categoriesRepository.create({ name, description });
  }
}

export { CreateCategoryUseCase };
