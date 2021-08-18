import { getRepository, Repository } from 'typeorm';

import {
  ICreateSpecificationDTO,
  ISpecificationsRepository,
} from '@modules/cars/repositories/interfaces/ISpecificationsRepository';

import { Specification } from '../entities/Specification';

class SpecificationRepository implements ISpecificationsRepository {
  private specificationRepository: Repository<Specification>;

  constructor() {
    this.specificationRepository = getRepository(Specification);
  }

  async create({
    name,
    description,
  }: ICreateSpecificationDTO): Promise<Specification> {
    const specification = this.specificationRepository.create({
      name,
      description,
    });

    await this.specificationRepository.save(specification);
    return specification;
  }

  async findByName(name: string): Promise<Specification> {
    const specification = await this.specificationRepository.findOne({ name });

    return specification;
  }

  async list(): Promise<Specification[]> {
    const listSpecification = await this.specificationRepository.find();
    return listSpecification;
  }

  async findByIds(ids: string[]): Promise<Specification[]> {
    const specifications = await this.specificationRepository.findByIds(ids);

    return specifications;
  }
}

export { SpecificationRepository };
