import { CarsRepositoryFakeMemory } from '@modules/cars/repositories/fakes-memory/CarsRepositoryFakeMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateCarUseCase } from './CreateCarUseCase';

let createCarUseCase: CreateCarUseCase;
let carsRepository: CarsRepositoryFakeMemory;
describe('Create Car', () => {
  beforeEach(() => {
    carsRepository = new CarsRepositoryFakeMemory();
    createCarUseCase = new CreateCarUseCase(carsRepository);
  });

  it('should be able to create a new car', async () => {
    const car = await createCarUseCase.execute({
      name: 'Name Car',
      description: 'Description Car',
      daily_rate: 100,
      license_plate: 'jkl-2240',
      brand: 'FIAT',
      fine_amount: 60,
      category_id: 'category',
    });

    expect(car).toHaveProperty('id');
  });

  it('It should not allow creating a Car with the existing license plate.', async () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: 'Car-20',
        description: 'Description-20',
        daily_rate: 20,
        license_plate: 'jkl-20',
        brand: 'FIAT-20',
        fine_amount: 20,
        category_id: 'category-20',
      });

      await createCarUseCase.execute({
        name: 'Car-20',
        description: 'Description-20',
        daily_rate: 20,
        license_plate: 'jkl-20',
        brand: 'FIAT-20',
        fine_amount: 20,
        category_id: 'category-20',
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('It should not be able to create a Car with available true by default', async () => {
    const car = await createCarUseCase.execute({
      name: 'Car-10',
      description: 'Description-10',
      daily_rate: 50,
      license_plate: 'jkl-2240',
      brand: 'FIAT',
      fine_amount: 60,
      category_id: 'category',
    });

    expect(car.available).toBe(true);
  });
});
