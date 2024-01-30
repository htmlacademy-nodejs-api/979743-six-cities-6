import got from 'got';
// import { appendFile } from 'node:fs';
import { Command } from './command.interface.js';
import { GENERATE_COMMAND } from './consts.js';
import { TMockServerData } from '../../types/index.js';
import { TSVOfferGenerator } from '../../libs/offer-generator/index.js';
import { getErrorMessage } from '../../helpers/common.js';
import { TSVFileWriter } from '../../libs/file-writer/tsv-file-writer.js';

export class GenerateCommand implements Command {
  private initialData: TMockServerData; // это данные-заготовки, из которых будем лепить строку

  private async load(url: string) {
    try {
      this.initialData = await got.get(url).json();
    } catch {
      throw new Error(`Can't load data from ${url}`);
    }
  }

  private async write(filepath: string, offerCount: number) {
    const tsvOfferGenerator = new TSVOfferGenerator(this.initialData);
    const tsvFileWriter = new TSVFileWriter(filepath);

    for (let i = 0; i < offerCount; i++) {
      await tsvFileWriter.write(tsvOfferGenerator.generate());
    }
  }

  public get name(): string {
    return GENERATE_COMMAND;
  }

  public async execute(...parameters: string[]): Promise<void> {
    const [count, filepath, url] = parameters;
    const offerCount = Number.parseInt(count, 10);

    try {
      await this.load(url);
      await this.write(filepath, offerCount);
      console.info(`File ${filepath} was created!`);
    } catch (error: unknown) {
      console.error('Can\'t generate data');

      console.error(getErrorMessage(error));
    }

  }
}
