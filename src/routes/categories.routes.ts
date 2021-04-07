import { Router } from 'express';

import { CategoriesRepository } from '../modules/cards/repositories/CategoriesRepository';
import { createCategoryController } from '../modules/cards/useCases/createCategory';

const categoriesRouters = Router();
const categoriesRepository = new CategoriesRepository();

categoriesRouters.post('/', (request, response) => {
  return createCategoryController.handle(request, response);
});

categoriesRouters.get('/', (request, response) => {
  const listCategories = categoriesRepository.list();

  return response.status(200).json(listCategories);
});

export { categoriesRouters };
