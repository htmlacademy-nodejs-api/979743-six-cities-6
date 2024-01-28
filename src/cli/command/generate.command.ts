import got from 'got';
import { appendFile } from 'node:fs';
import { Command } from './command.interface.js';
import { GENERATE_COMMAND } from './consts.js';
import { TMockServerData } from '../../types/index.js';
import { TSVOfferGenerator } from '../../libs/offer-generator/index.js';

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
    for (let i = 0; i < offerCount; i++) {
      // await appendFile(
      //   filepath,
      //   `${tsvOfferGenerator.generate()}\n`,
      //  { encoding: 'utf8' }
      // );
      await appendFile(
        filepath,
        `${tsvOfferGenerator.generate()}\n`,
        {encoding: 'utf8'},
        (err) => {
          if (err) {
            throw err;
          }
          console.log('строка записана в файл');
        }
      );
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

      if (error instanceof Error) {
        console.error(error.message);
      }
    }

  }
}
