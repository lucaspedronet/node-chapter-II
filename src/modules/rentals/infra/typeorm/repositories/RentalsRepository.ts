import { getRepository, Repository } from 'typeorm';

import { ICreateRentalDTO } from '@modules/rentals/dtos/ICreateRentalDTO';
import { IRentalsRepository } from '@modules/rentals/repositories/interfaces/IRentalsRepository';

import { Rental } from '../entities/Rentals';

class RentalsRepository implements IRentalsRepository {
  private rentalsRepository: Repository<Rental>;

  constructor() {
    this.rentalsRepository = getRepository(Rental);
  }

  public async create({
    car_id,
    user_id,
    expected_return_date,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = this.rentalsRepository.create({
      car_id,
      user_id,
      expected_return_date,
    });

    await this.rentalsRepository.save(rental);

    return rental;
  }

  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    const rental = await this.rentalsRepository.findOne({ where: { car_id } });

    return rental;
  }
  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    const rental = await this.rentalsRepository.findOne({ where: { user_id } });

    return rental;
  }
}

export { RentalsRepository };
