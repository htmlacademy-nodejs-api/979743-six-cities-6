import { Command } from './command.interface.js';
import { TSVFileReader } from '../../libs/file-reader/tsv-file-reader.js';

export class ImportCommand implements Command {
  public getName(): string {
    return '--import';
  }

  public execute(...parameters: string[]): void { // на вход должен прийти путь к файлу = строка
    const [filename] = parameters;
    const fileReader = new TSVFileReader(filename.trim());

    try {
      fileReader.read();
      console.log(fileReader.toArray());
    } catch(err) {
      if(!(err instanceof Error)) {
        throw err; // как-то обрабатываем дальше если это не Error
      }

      console.error(`Can't import data from file: ${filename}`);
      console.error(`Details: ${err.message}`);
    }
  }
}
