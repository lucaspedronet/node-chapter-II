import { CarsImagesRepositoryFakeMemory } from '@modules/cars/repositories/fakes-memory/CarsImagesRepositoryFakeMemory';

import { UploadCarsImagesUseCase } from './UploadCarsImagesUseCase';

let carsImagesRepositoryFakeMemory: CarsImagesRepositoryFakeMemory;
let uploadCarImageUseCase: UploadCarsImagesUseCase;
describe('Upload multiple images to a car', () => {
  beforeEach(() => {
    carsImagesRepositoryFakeMemory = new CarsImagesRepositoryFakeMemory();
    uploadCarImageUseCase = new UploadCarsImagesUseCase(
      carsImagesRepositoryFakeMemory
    );
  });

  it('Must allow Upload multiple Images a to Car', async () => {
    const carImage = await uploadCarImageUseCase.execute({
      car_id: 'fake-123',
      images_name: ['fake-image', 'fake-image-02'],
    });

    expect(carImage.length).toBe(2);
    expect(carImage[0]).toHaveProperty('id');
    expect(carImage[1].image_name).toEqual('fake-image-02');
  });
});
