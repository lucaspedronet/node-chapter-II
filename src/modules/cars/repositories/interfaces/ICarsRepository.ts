import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';
import { IFilterCarsDTO } from '@modules/cars/dtos/IFilterCarsDTO';
import { Cars } from '@modules/cars/infra/typeorm/entities/Cars';

interface ICarsRepository {
  create(data: Omit<ICreateCarDTO, 'available'>): Promise<Cars>;
  findById(carId: string): Promise<Cars>;
  findByLicensePlate(license_plate: string): Promise<Cars>;
  findAvailable({ category_id, brand, name }: IFilterCarsDTO): Promise<Cars[]>;
}

export { ICarsRepository };
