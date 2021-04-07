import { Router } from 'express';

import { CategoriesRepository } from '../modules/cards/repositories/CategoriesRepository';
import { CreateCategoryService } from '../modules/cards/services/CreateCategoryService';

const categoriesRouters = Router();
const categoriesRepository = new CategoriesRepository();

categoriesRouters.post('/', (request, response) => {
  const { name, description } = request.body;
  const createCategoryService = new CreateCategoryService(categoriesRepository);

  createCategoryService.execute({ name, description });

  return response.status(201).send();
});

categoriesRouters.get('/', (request, response) => {
  const listCategories = categoriesRepository.list();

  return response.status(201).json(listCategories);
});

export { categoriesRouters };
