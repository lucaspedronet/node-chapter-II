import { getRepository, Repository } from 'typeorm';

import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';
import { ICarsRepository } from '@modules/cars/repositories/interfaces/ICarsRepository';

import { Cars } from '../entities/Cars';

class CarsRepository implements ICarsRepository {
  private carsRepository: Repository<Cars>;

  constructor() {
    this.carsRepository = getRepository(Cars);
  }
  async create({
    name,
    description,
    daily_rate,
    license_plate,
    brand,
    category_id,
    fine_amount,
  }: Omit<ICreateCarDTO, 'available'>): Promise<Cars> {
    const car = this.carsRepository.create({
      name,
      description,
      daily_rate,
      license_plate,
      brand,
      category_id,
      fine_amount,
    });

    await this.carsRepository.save(car);

    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Cars> {
    const car = await this.carsRepository.findOne({ where: { license_plate } });

    return car;
  }
}
export { CarsRepository };
