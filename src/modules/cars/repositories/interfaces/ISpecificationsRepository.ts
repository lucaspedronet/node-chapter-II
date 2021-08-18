import { Specification } from '../../infra/typeorm/entities/Specification';

interface ICreateSpecificationDTO {
  id?: string;
  name: string;
  description: string;
}

interface ISpecificationsRepository {
  create({
    id,
    name,
    description,
  }: ICreateSpecificationDTO): Promise<Specification>;
  findByName(name: string): Promise<Specification>;
  list(): Promise<Specification[]>;
  findByIds(ids: string[]): Promise<Specification[]>;
}

export { ISpecificationsRepository, ICreateSpecificationDTO };
