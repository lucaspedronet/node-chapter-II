import { inject, injectable } from 'tsyringe';

import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';
import { Cars } from '@modules/cars/infra/typeorm/entities/Cars';
import { ICarsRepository } from '@modules/cars/repositories/interfaces/ICarsRepository';
import { AppError } from '@shared/errors/AppError';

@injectable()
class CreateCarUseCase {
  constructor(
    @inject('CarsRepository')
    private createCarsRepository: ICarsRepository
  ) {}

  async execute({
    name,
    description,
    daily_rate,
    license_plate,
    brand,
    fine_amount,
    category_id,
  }: Omit<ICreateCarDTO, 'available'>): Promise<Cars> {
    const carAlreadyExist = await this.createCarsRepository.findByLicensePlate(
      license_plate
    );

    if (carAlreadyExist) {
      throw new AppError('Car already exist!');
    }

    const car = await this.createCarsRepository.create({
      name,
      description,
      daily_rate,
      license_plate,
      brand,
      fine_amount,
      category_id,
    });

    return car;
  }
}

export { CreateCarUseCase };
