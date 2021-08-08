import { inject, injectable } from 'tsyringe';

import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';

interface IRequestDTO {
  name: string;
  description: string;
}

@injectable()
class CreateCategoryUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository
  ) {}

  async execute({ description, name }: IRequestDTO): Promise<void> {
    const categoryAlreadyExist = await this.categoriesRepository.findByName(
      name
    );

    if (categoryAlreadyExist) {
      throw new Error('Category Already exist!');
    }

    this.categoriesRepository.create({ name, description });
  }
}

export { CreateCategoryUseCase };
