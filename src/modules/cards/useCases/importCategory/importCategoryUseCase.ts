import csvParse from 'csv-parse';
import fs from 'fs';

class ImportCategoryUseCase {
  execute(file: Express.Multer.File): void {
    // criando um stream de leitura do arquivo
    const stream = fs.createReadStream(file.path);

    const parseFile = csvParse();

    // pipe() pega esse pedaço de arquivo q foi lido e passa para parseFile
    stream.pipe(parseFile);

    // o parseFile.on() vai ler linha por linha desse arquivo csv
    parseFile.on('data', async (line) => {
      console.log(line);
    });
  }
}

export { ImportCategoryUseCase };
