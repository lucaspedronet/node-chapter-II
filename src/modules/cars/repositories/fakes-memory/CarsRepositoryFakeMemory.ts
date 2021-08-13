import { v4 as uuid4 } from 'uuid';

import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';
import { Cars } from '@modules/cars/infra/typeorm/entities/Cars';

import { ICarsRepository } from '../interfaces/ICarsRepository';

class CarsRepositoryFakeMemory implements ICarsRepository {
  private cars: Cars[] = [];

  async create({
    name,
    description,
    license_plate,
    daily_rate,
    fine_amount,
    brand,
    category_id,
  }: Omit<ICreateCarDTO, 'available'>): Promise<Cars> {
    const car = new Cars();

    Object.assign(car, {
      id: uuid4(),
      name,
      description,
      license_plate,
      daily_rate,
      fine_amount,
      brand,
      category_id,
    });

    this.cars.push(car);

    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Cars> {
    const car = await this.cars.find(
      (car) => car.license_plate === license_plate
    );

    return car;
  }
}

export { CarsRepositoryFakeMemory };
