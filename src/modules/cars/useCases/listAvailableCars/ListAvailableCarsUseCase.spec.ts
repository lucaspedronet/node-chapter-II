import { CarsRepositoryFakeMemory } from '@modules/cars/repositories/fakes-memory/CarsRepositoryFakeMemory';

import { CreateCarUseCase } from '../createCar/CreateCarUseCase';
import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase';

let createCarUseCase: CreateCarUseCase;
let carsFakeMemory: CarsRepositoryFakeMemory;
let listCars: ListAvailableCarsUseCase;
describe('List Cars', () => {
  beforeEach(() => {
    carsFakeMemory = new CarsRepositoryFakeMemory();
    createCarUseCase = new CreateCarUseCase(carsFakeMemory);
    listCars = new ListAvailableCarsUseCase(carsFakeMemory);
  });

  it('Should be able to List all available cars', async () => {
    const car1 = await createCarUseCase.execute({
      name: 'Car_01',
      description: 'Description Car',
      daily_rate: 100,
      license_plate: 'fake-2240',
      brand: 'Fake_brand_01',
      fine_amount: 60,
      category_id: 'category_01',
    });

    const car2 = await createCarUseCase.execute({
      name: 'Car_02',
      description: 'Description Car',
      daily_rate: 100,
      license_plate: 'fake-1221',
      brand: 'Fake_brand_02',
      fine_amount: 60,
      category_id: 'category_02',
    });

    const cars = await listCars.execute({
      brand: 'Fake_brand_02',
      category_id: '',
      name: '',
    });
    // console.log(cars);

    expect(car1).toHaveProperty('id');
    expect(car2).toHaveProperty('id');
    expect(cars.length).toEqual(1);
    expect(cars).toEqual([car2]);
  });

  it('Should be able to List all available cars by brand', async () => {
    const car1 = await createCarUseCase.execute({
      name: 'Car_03',
      description: 'Description_Car_03',
      daily_rate: 100,
      license_plate: 'fake_03',
      brand: 'Fake_brand_03',
      fine_amount: 60,
      category_id: 'category_03',
    });

    const cars = await listCars.execute({
      brand: 'Fake_brand_03',
    });

    expect(cars).toEqual([car1]);
    expect(cars[0].brand).toEqual('Fake_brand_03');
  });

  it('Should be able to List all available cars by name', async () => {
    const car1 = await createCarUseCase.execute({
      name: 'Car_04',
      description: 'Description_Car_04',
      daily_rate: 100,
      license_plate: 'fake_04',
      brand: 'Fake_brand_04',
      fine_amount: 60,
      category_id: 'category_04',
    });

    const cars = await listCars.execute({
      name: 'Car_04',
    });

    expect(cars).toEqual([car1]);
    expect(cars[0].name).toEqual('Car_04');
  });

  it('Should be able to List all available cars by category_id', async () => {
    const car1 = await createCarUseCase.execute({
      name: 'Car_05',
      description: 'Description_Car_05',
      daily_rate: 100,
      license_plate: 'fake_05',
      brand: 'Fake_brand_05',
      fine_amount: 60,
      category_id: 'fake_category_id_05',
    });

    const cars = await listCars.execute({
      category_id: 'fake_category_id_05',
    });

    expect(cars).toEqual([car1]);
    expect(cars[0].category_id).toEqual('fake_category_id_05');
  });
});
