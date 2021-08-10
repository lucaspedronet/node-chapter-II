import { Router } from 'express';
import multer from 'multer';

import { ensureAuthenticated } from '@middleware/ensureAuthenticated';
import { CreateCategoryController } from '@modules/cars/useCases/createCategory/CreateCategoryController';
import { ImportCategoryController } from '@modules/cars/useCases/importCategory/importCategoryController';
import { ListCategoriesController } from '@modules/cars/useCases/listCategories/ListCategoriesController';

const categoriesRouters = Router();
const upLoad = multer({
  dest: './temp',
});

// instance controllers
const createCategoryController = new CreateCategoryController();
const listCategoriesController = new ListCategoriesController();
const importCategoryController = new ImportCategoryController();

// routes

categoriesRouters.use(ensureAuthenticated);
categoriesRouters.post('/', createCategoryController.handle);

categoriesRouters.get('/', listCategoriesController.handle);

// eslint-disable-next-line prettier/prettier
categoriesRouters.post('/imports', upLoad.single('file'), importCategoryController.handle);

export { categoriesRouters };
