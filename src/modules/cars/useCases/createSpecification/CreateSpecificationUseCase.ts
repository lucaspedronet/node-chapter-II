import { inject, injectable } from 'tsyringe';

import {
  ICreateSpecificationDTO,
  ISpecificationsRepository,
} from '../../repositories/ISpecificationsRepository';

@injectable()
class CreateSpecificationUseCase {
  constructor(
    @inject('SpecificationsRepository')
    private specificationsRepository: ISpecificationsRepository
  ) {}

  async execute({ name, description }: ICreateSpecificationDTO): Promise<void> {
    const specificationAlreadyExist = await this.specificationsRepository.findByName(
      name
    );

    if (specificationAlreadyExist) {
      throw new Error('Specification Already exists');
    }

    await this.specificationsRepository.create({ name, description });
  }
}

export { CreateSpecificationUseCase };
