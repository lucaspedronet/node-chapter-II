import { Specification } from '@modules/cars/infra/typeorm/entities/Specification';

import {
  ICreateSpecificationDTO,
  ISpecificationsRepository,
} from '../interfaces/ISpecificationsRepository';

class SpecificationsRepositoryFakeMemory implements ISpecificationsRepository {
  private specifications: Specification[] = [];

  async create({
    name,
    description,
  }: ICreateSpecificationDTO): Promise<Specification> {
    const specification = new Specification();

    Object.assign(specification, {
      name,
      description,
    });

    this.specifications.push(specification);
    return specification;
  }

  async findByName(name: string): Promise<Specification> {
    const specification = await this.specifications.find(
      (s) => s.name === name
    );

    return specification;
  }
  async findByIds(ids: string[]): Promise<Specification[]> {
    const allSpecifications = await this.specifications.filter((s) =>
      ids.includes(s.id)
    );

    return allSpecifications;
  }
  async list(): Promise<Specification[]> {
    return this.specifications;
  }
}

export { SpecificationsRepositoryFakeMemory };
