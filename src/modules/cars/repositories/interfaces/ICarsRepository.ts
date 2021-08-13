import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';
import { Cars } from '@modules/cars/infra/typeorm/entities/Cars';

interface ICarsRepository {
  create(data: Omit<ICreateCarDTO, 'available'>): Promise<Cars>;
  findByLicensePlate(license_plate: string): Promise<Cars>;
}

export { ICarsRepository };
