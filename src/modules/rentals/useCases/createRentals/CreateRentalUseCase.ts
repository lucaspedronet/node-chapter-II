import { inject, injectable } from 'tsyringe';

import { Rental } from '@modules/rentals/infra/typeorm/entities/Rentals';
import { IRentalsRepository } from '@modules/rentals/repositories/interfaces/IRentalsRepository';
import { AppError } from '@shared/errors/AppError';

type IRequest = {
  car_id: string;
  user_id: string;
  expected_return_date: Date;
};

class CreateRentalUseCase {
  constructor(private rentalsRepository: IRentalsRepository) {}

  async execute({
    car_id,
    user_id,
    expected_return_date,
  }: IRequest): Promise<Rental> {
    /**
     * - O aluguél DEVE ter duração MÍNIMA de 24 HORAS.
     * - NÃO DEVE ser possível cadastrar um novo aluguél caso já exista um aberto para o mesmo usuário.
     * - NÃO DEVE ser possível cadastrar um novo aluguél caso já exista um aberto para o mesmo carro.
     */

    const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(
      car_id
    );

    if (carUnavailable) {
      throw new AppError('Car is unavailable');
    }

    const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(
      user_id
    );

    if (rentalOpenToUser) {
      throw new AppError("There's a rental in progresses to user!");
    }

    const rental = await this.rentalsRepository.create({
      car_id,
      user_id,
      expected_return_date,
    });

    return rental;
  }
}

export { CreateRentalUseCase };
