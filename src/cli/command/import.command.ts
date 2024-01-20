import { Command } from './command.interface.js';
import { IMPORT_COMMAND } from './consts.js';
import { TSVFileReader } from '../../libs/file-reader/tsv-file-reader.js';

export class ImportCommand implements Command {
  public get name(): string {
    return IMPORT_COMMAND;
  }

  public execute(...parameters: string[]): void {
    const [filename] = parameters;
    if(!filename) {
      console.error('Не указан путь к файлу');
      return;
    }
    const fileReader = new TSVFileReader(filename.trim());

    try {
      fileReader.read();
      console.log(fileReader.toArray());
    } catch(err) {
      if(!(err instanceof Error)) {
        throw err;
      }

      console.error(`Can't import data from file: ${filename}`);
      console.error(`Details: ${err.message}`);
    }
  }
}
