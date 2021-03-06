import { add, formatISO } from 'date-fns';

import { RentalsRepositoryFakeMemory } from '@modules/rentals/repositories/fakes-memory/RentalsRepositoryFakeMemory';
import { DateFnsProvider } from '@shared/container/providers/DateProviders/DateFns/implementations/DateFnsProvider';
import { AppError } from '@shared/errors/AppError';

import { CreateRentalUseCase } from './CreateRentalUseCase';

let dateFnsDateProvider: DateFnsProvider;
let createRentalUseCase: CreateRentalUseCase;
let rentalsRepository: RentalsRepositoryFakeMemory;
describe('Create Rental', () => {
  const dayAdd24Hours = add(new Date(), { minutes: 1441 }); // 1h e 1min
  // console.log('dayAdd24Hours: ', dayAdd24Hours);

  beforeEach(() => {
    dateFnsDateProvider = new DateFnsProvider();
    rentalsRepository = new RentalsRepositoryFakeMemory();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepository,
      dateFnsDateProvider
    );
  });

  it('Should to able create new Rental', async () => {
    const rental = await createRentalUseCase.execute({
      car_id: '123',
      user_id: 'jkl-123',
      expected_return_date: dayAdd24Hours,
    });

    expect(rental).toHaveProperty('id');
    expect(rental).toHaveProperty('expected_return_date');
  });

  it('Should not be able to create new Rental, if there is another open to the same User', async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        car_id: 'Fake-xxx',
        user_id: 'fake-user-10',
        expected_return_date: dayAdd24Hours,
      });
      await createRentalUseCase.execute({
        car_id: 'Fake-xxx',
        user_id: 'fake-user-20',
        expected_return_date: dayAdd24Hours,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to create new Rental, if there is another open to the same Car', async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        car_id: 'fake-car-10',
        user_id: 'Fake-xxx',
        expected_return_date: dayAdd24Hours,
      });
      await createRentalUseCase.execute({
        car_id: 'fake-car-20',
        user_id: 'Fake-xxx',
        expected_return_date: dayAdd24Hours,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to create new Rental with invalid return time', async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        car_id: 'fake-car-10',
        user_id: 'Fake-xxx',
        expected_return_date: new Date(formatISO(new Date())),
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
