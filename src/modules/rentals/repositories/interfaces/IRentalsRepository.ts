import { ICreateRentalDTO } from '@modules/rentals/dtos/ICreateRentalDTO';
import { Rental } from '@modules/rentals/infra/typeorm/entities/Rentals';

interface IRentalsRepository {
  create({
    car_id,
    user_id,
    expected_return_date,
  }: ICreateRentalDTO): Promise<Rental>;
  findOpenRentalByCar(car_id: string): Promise<Rental>;
  findOpenRentalByUser(user_id: string): Promise<Rental>;
}

export { IRentalsRepository };
