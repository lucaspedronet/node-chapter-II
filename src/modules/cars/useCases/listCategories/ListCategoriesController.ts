import { Request, Response } from 'express';

import { ListCategoriesUseCase } from './ListCategoriesUseCase';

class ListCategoriesController {
  constructor(private categoriesRepository: ListCategoriesUseCase) {}

  handle(request: Request, response: Response): Response<void> {
    const listCategories = this.categoriesRepository.execute();

    return response.status(200).json(listCategories);
  }
}

export { ListCategoriesController };
