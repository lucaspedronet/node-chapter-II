import { Router } from 'express';
import multer from 'multer';

import { CreateCategoryController } from '@modules/cars/useCases/createCategory/CreateCategoryController';
import { ImportCategoryController } from '@modules/cars/useCases/importCategory/importCategoryController';
import { ListCategoriesController } from '@modules/cars/useCases/listCategories/ListCategoriesController';
import { ensureAuthenticated } from '@shared/infra/http/middleware/ensureAuthenticated';

import { ensureAdmin } from '../middleware/ensureAdmin';

const categoriesRouters = Router();
const upLoad = multer({
  dest: './temp',
});

// instance controllers
const createCategoryController = new CreateCategoryController();
const listCategoriesController = new ListCategoriesController();
const importCategoryController = new ImportCategoryController();

// routes
categoriesRouters.get('/', listCategoriesController.handle);

// routes authenticated
categoriesRouters.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  createCategoryController.handle
);

categoriesRouters.post(
  '/imports',
  upLoad.single('file'),
  ensureAuthenticated,
  ensureAdmin,
  importCategoryController.handle
);

export { categoriesRouters };
