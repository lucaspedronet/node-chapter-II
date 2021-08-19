import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UseCase } from './UseCase';

class CreateRentalController {
  handle(request: Request, response: Response): Response {
    const {} = request.body;
    const useUseCase = container.resolve(UseCase);
    useUseCase.execute({});

    return response.status(201).send();
  }
}

export { CreateRentalController };
