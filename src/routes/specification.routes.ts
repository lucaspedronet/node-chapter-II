import { response, Router } from 'express';

import { SpecificationRepository } from '../modules/cards/repositories/SpecificationsRepository';
import { CreateSpecificationService } from '../modules/cards/services/CreateSpecificationService';

const specificationsRoutes = Router();
const specification = new SpecificationRepository();

specificationsRoutes.post('/', (request, response) => {
  const { name, description } = request.body;
  const createSpecificationServices = new CreateSpecificationService(
    specification
  );

  createSpecificationServices.execute({ name, description });

  return response.status(201).send();
});
export { specificationsRoutes };
