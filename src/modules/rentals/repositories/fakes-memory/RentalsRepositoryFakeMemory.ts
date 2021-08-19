import { ICreateRentalDTO } from '@modules/rentals/dtos/ICreateRentalDTO';
import { Rental } from '@modules/rentals/infra/typeorm/entities/Rentals';

import { IRentalsRepository } from '../interfaces/IRentalsRepository';

class RentalsRepositoryFakeMemory implements IRentalsRepository {
  private repository: Rental[] = [];

  public async create({
    car_id,
    user_id,
    expected_return_date,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = new Rental();

    Object.assign(rental, {
      car_id,
      user_id,
      expected_return_date,
      start_date: new Date(),
    });

    this.repository.push(rental);

    return rental;
  }

  public async findOpenRentalByCar(car_id: string): Promise<Rental> {
    const rental = await this.repository.find(
      (r) => r.car_id === car_id && !r.end_date
    );

    return rental;
  }

  public async findOpenRentalByUser(user_id: string): Promise<Rental> {
    const rental = await this.repository.find(
      (r) => r.user_id === user_id && !r.end_date
    );

    return rental;
  }
}

export { RentalsRepositoryFakeMemory };
