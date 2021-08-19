import { inject, injectable } from 'tsyringe';

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

  async execute({ car_id, images_name }: IRequest): Promise<void> {
    images_name.map(async (image) => {
      await this.carsImagesRepository.create({ car_id, image_name: image });
    });
  }
}

export { UploadCarsImagesUseCase };