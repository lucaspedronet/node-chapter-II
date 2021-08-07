import { Router } from 'express';

import { SpecificationRepository } from '../modules/cards/repositories/implementations/SpecificationsRepository';
import { createSpecificationController } from '../modules/cards/useCases/createSpecification';

const specificationsRoutes = Router();
const specification = new SpecificationRepository();

specificationsRoutes.post('/', (request, response) => {
  createSpecificationController.handle(request, response);
});

specificationsRoutes.get('/', (request, response) => {
  const listSpecifications = specification.list();

  return response.status(200).json(listSpecifications);
});

export { specificationsRoutes };
