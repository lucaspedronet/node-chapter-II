import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateUserUseCase } from './CreateUserUseCase';

class CreateUserController {
  handle(request: Request, response: Response): Response {
    const { name, email, username, password, driverLicenses } = request.body;
    const useUseCase = container.resolve(CreateUserUseCase);
    useUseCase.execute({
      name,
      email,
      username,
      password,
      driverLicenses,
    });

    return response.status(201).send();
  }
}

export { CreateUserController };
