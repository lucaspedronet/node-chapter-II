import { inject, injectable } from 'tsyringe';

import { IFilterCarsDTO } from '@modules/cars/dtos/IFilterCarsDTO';
import { Cars } from '@modules/cars/infra/typeorm/entities/Cars';
import { ICarsRepository } from '@modules/cars/repositories/interfaces/ICarsRepository';

@injectable()
class ListCarsUseCase {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository
  ) {}

  async execute({ category_id, brand, name }: IFilterCarsDTO): Promise<Cars[]> {
    const listCars = await this.carsRepository.findAvailable({
      category_id,
      brand,
      name,
    });

    return listCars;
  }
}

export { ListCarsUseCase };
