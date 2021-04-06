import { Router } from "express";

import { CategoriesRepository } from "../repositories/CategoriesRepository";

const categoriesRouters = Router();
const categoriesRepository = new CategoriesRepository();

categoriesRouters.post("/", (request, response) => {
  const { name, description } = request.body;

  const categoryAlreadyExist = categoriesRepository.findByName(name);

  if (categoryAlreadyExist) {
    return response.status(400).json({ error: "Category Already exist!" });
  }

  categoriesRepository.crete({ name, description });

  return response.status(201).send();
});

categoriesRouters.get("/", (request, response) => {
  const listCategories = categoriesRepository.list();

  return response.status(201).json(listCategories);
});

export { categoriesRouters };
