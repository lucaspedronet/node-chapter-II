import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateRentalUseCase } from './CreateRentalUseCase';

class CreateRentalController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { expectedReturnDate, carId } = request.body;
    const { userId } = request.query;

    const createRentalUseCase = container.resolve(CreateRentalUseCase);
    const rental = await createRentalUseCase.execute({
      car_id: carId,
      user_id: userId as string,
      expected_return_date: new Date(expectedReturnDate),
    });

    return response.status(201).json(rental);
  }
}

export { CreateRentalController };
