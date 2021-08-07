import { Router } from 'express';
import multer from 'multer';

import { createCategoryController } from '../modules/cards/useCases/createCategory';
import { importCategoryController } from '../modules/cards/useCases/importCategory';
import { listCategoriesController } from '../modules/cards/useCases/listCategories';

const categoriesRouters = Router();
const upLoad = multer({
  dest: './temp',
});

categoriesRouters.post('/', (request, response) => {
  return createCategoryController.handle(request, response);
});

categoriesRouters.get('/', (request, response) => {
  return listCategoriesController.handle(request, response);
});

// eslint-disable-next-line prettier/prettier
categoriesRouters.post('/imports', upLoad.single('file'), (request, response) => {
    importCategoryController.handle(request, response);
  }
);

export { categoriesRouters };
