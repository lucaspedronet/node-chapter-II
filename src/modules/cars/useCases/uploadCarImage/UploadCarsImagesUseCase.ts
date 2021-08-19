import { inject, injectable } from 'tsyringe';

import { CarImage } from '@modules/cars/infra/typeorm/entities/CarImage';
import { ICarsImagesRepository } from '@modules/cars/repositories/interfaces/ICarsImagesRepository';

type IRequest = {
  car_id: string;
  images_name: string[];
};

@injectable()
class UploadCarsImagesUseCase {
  constructor(
    @inject('CarsImagesRepository')
    private carsImagesRepository: ICarsImagesRepository
  ) {}

  async execute({ car_id, images_name }: IRequest): Promise<CarImage[]> {
    const images: CarImage[] = [];

    images_name.map(async (image) => {
      const carImage = await this.carsImagesRepository.create({
        car_id,
        image_name: image,
      });
      images.push(carImage);
    });

    return images;
  }
}

export { UploadCarsImagesUseCase };
