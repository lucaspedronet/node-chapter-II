import { inject, injectable } from 'tsyringe';

import { ICategoriesRepository } from '@modules/cars/repositories/interfaces/ICategoriesRepository';
import { AppError } from '@shared/errors/AppError';

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
      throw new AppError('Category Already exist!', 400);
    }

    this.categoriesRepository.create({ name, description });
  }
}

export { CreateCategoryUseCase };
