import { v4 as uuid4 } from 'uuid';

import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';
import { IFilterCarsDTO } from '@modules/cars/dtos/IFilterCarsDTO';
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

  async findAvailable({
    category_id,
    brand,
    name,
  }: IFilterCarsDTO): Promise<Cars[]> {
    const listCars = await this.cars.filter((car) => car.available === true);

    if (listCars.length > 0) {
      const listCarsAvailable = await listCars.filter(
        (car) =>
          (brand && car.brand === brand) ||
          (category_id && car.category_id === category_id) ||
          (name && car.name === name)
      );

      return listCarsAvailable;
    }

    return listCars;
  }
}

export { CarsRepositoryFakeMemory };
