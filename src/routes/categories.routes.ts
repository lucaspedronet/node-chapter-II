import { Router } from 'express';

import { createCategoryController } from '../modules/cards/useCases/createCategory';
import { listCategoriesController } from '../modules/cards/useCases/listCategories';

const categoriesRouters = Router();

categoriesRouters.post('/', (request, response) => {
  return createCategoryController.handle(request, response);
});

categoriesRouters.get('/', (request, response) => {
  return listCategoriesController.handle(request, response);
});

export { categoriesRouters };
