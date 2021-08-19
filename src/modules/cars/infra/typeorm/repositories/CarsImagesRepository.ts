import { getRepository, Repository } from 'typeorm';

import { ICreateCarImageDTO } from '@modules/cars/dtos/ICreateCarImageDTO';
import { ICarsImagesRepository } from '@modules/cars/repositories/interfaces/ICarsImagesRepository';

import { CarImage } from '../entities/CarImage';

class CarsImagesRepository implements ICarsImagesRepository {
  private carsImagesRepository: Repository<CarImage>;

  constructor() {
    this.carsImagesRepository = getRepository(CarImage);
  }

  async create({ car_id, image_name }: ICreateCarImageDTO): Promise<CarImage> {
    const carImage = this.carsImagesRepository.create({ car_id, image_name });

    await this.carsImagesRepository.save(carImage);

    console.log(carImage);

    return carImage;
  }
}

export { CarsImagesRepository };
