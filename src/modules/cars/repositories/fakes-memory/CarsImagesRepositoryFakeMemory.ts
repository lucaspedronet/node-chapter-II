import { ICreateCarImageDTO } from '@modules/cars/dtos/ICreateCarImageDTO';
import { CarImage } from '@modules/cars/infra/typeorm/entities/CarImage';

import { ICarsImagesRepository } from '../interfaces/ICarsImagesRepository';

class CarsImagesRepositoryFakeMemory implements ICarsImagesRepository {
  private repository: CarImage[] = [];

  async create({ car_id, image_name }: ICreateCarImageDTO): Promise<CarImage> {
    const carImage = new CarImage();

    Object.assign(carImage, {
      car_id,
      image_name,
    });

    this.repository.push(carImage);

    return carImage;
  }
}

export { CarsImagesRepositoryFakeMemory };
