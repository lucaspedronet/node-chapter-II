import csvParse from 'csv-parse';
import fs from 'fs';

import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';

interface ICategories {
  name: string;
  description: string;
}
class ImportCategoryUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {}
  categories: ICategories[] = [];

  loadCategories(file: Express.Multer.File): Promise<ICategories[]> {
    return new Promise((resolve, reject) => {
      // criando um stream de leitura do arquivo
      const stream = fs.createReadStream(file.path);

      const parseFile = csvParse();

      // pipe() pega esse pedaço de arquivo q foi lido e passa para parseFile
      stream.pipe(parseFile);

      // o parseFile.on() vai ler linha por linha desse arquivo csv
      parseFile
        .on('data', async (line) => {
          const [name, description] = line;

          this.categories.push({
            name,
            description,
          });
        })
        .on('end', () => {
          fs.promises.unlink(file.path); // remove o arquivo da pasta temp
          resolve(this.categories);
        })
        .on('error', (error) => {
          reject(error);
        });
    });
  }

  async execute(file: Express.Multer.File): Promise<void> {
    const categories = await this.loadCategories(file);

    console.log(categories);

    categories.map(async (category) => {
      const { name, description } = category;

      const categoryExist = this.categoriesRepository.findByName(name);

      if (!categoryExist) {
        this.categoriesRepository.create({ name, description });
      }
    });
  }
}

export { ImportCategoryUseCase };
