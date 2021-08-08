import { Router } from 'express';
import multer from 'multer';

import { CreateCategoryController } from '../modules/cars/useCases/createCategory/CreateCategoryController';
import { importCategoryController } from '../modules/cars/useCases/importCategory';
import { listCategoriesController } from '../modules/cars/useCases/listCategories';

const categoriesRouters = Router();
const upLoad = multer({
  dest: './temp',
});

// instance controllers
const createCategoryController = new CreateCategoryController();

// routes
categoriesRouters.post('/', createCategoryController.handle);

categoriesRouters.get('/', (request, response) => {
  return listCategoriesController.handle(request, response);
});

// eslint-disable-next-line prettier/prettier
categoriesRouters.post('/imports', upLoad.single('file'), (request, response) => {

    importCategoryController.handle(request, response);
  }
);

export { categoriesRouters };
