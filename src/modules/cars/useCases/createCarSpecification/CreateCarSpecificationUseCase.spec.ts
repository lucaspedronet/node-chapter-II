import { CarsRepositoryFakeMemory } from '@modules/cars/repositories/fakes-memory/CarsRepositoryFakeMemory';
import { SpecificationsRepositoryFakeMemory } from '@modules/cars/repositories/fakes-memory/SpecificationsRepositoryFakeMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateCarUseCase } from '../createCar/CreateCarUseCase';
import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase';

let specificationsRepositoryFakeMemory: SpecificationsRepositoryFakeMemory;
let carsRepositoryFakeMemory: CarsRepositoryFakeMemory;
let createCarUseCase: CreateCarUseCase;
let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
describe('Create Car Specification', () => {
  beforeEach(() => {
    carsRepositoryFakeMemory = new CarsRepositoryFakeMemory();
    specificationsRepositoryFakeMemory =
      new SpecificationsRepositoryFakeMemory();

    createCarUseCase = new CreateCarUseCase(carsRepositoryFakeMemory);
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryFakeMemory,
      specificationsRepositoryFakeMemory
    );
  });

  it('Should to be able add a new specification to the new-existent car', async () => {
    expect(async () => {
      const car_id = '123';
      const specifications_id = ['000'];

      await createCarSpecificationUseCase.execute({
        specifications_id,
        car_id,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('Should to be able add a new specification to the car', async () => {
    const car = await createCarUseCase.execute({
      name: 'Name Car',
      description: 'Description Car',
      daily_rate: 100,
      license_plate: 'jkl-2240',
      brand: 'FIAT',
      fine_amount: 60,
      category_id: 'category',
    });

    const specification = await specificationsRepositoryFakeMemory.create({
      name: 'Fake_specification',
      description: 'Fake_description',
    });

    const specification_02 = await specificationsRepositoryFakeMemory.create({
      name: 'Fake_specification_02',
      description: 'Fake_description_02',
    });
    const specifications_id = [specification.id, specification_02.id];

    const carSpecification = await createCarSpecificationUseCase.execute({
      specifications_id,
      car_id: car.id,
    });

    expect(carSpecification).toHaveProperty('specifications');
    expect(carSpecification.specifications.length).toEqual(2);
  });
});
