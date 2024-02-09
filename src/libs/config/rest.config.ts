import { config } from 'dotenv';
import { inject, injectable } from 'inversify';
import { Config } from './config.interface.js';
import { Logger } from '../logger/index.js';
import { configRestSchema } from './rest.schema.js';
import { TRestSchema } from '../../types/index.js';
import { Component } from '../../types/index.js';

@injectable()
export class RestConfig implements Config<TRestSchema> {
  private readonly config: TRestSchema;

  constructor(
    @inject(Component.Logger) private readonly logger: Logger
  ) {
    const parsedOutput = config();
    if (parsedOutput.error) {
      throw new Error('Can\'t read .env file. Perhaps the file does not exists.');
    }
    configRestSchema.load({});
    configRestSchema.validate({allowed: 'strict', output: this.logger.info});
    this.config = configRestSchema.getProperties();

    this.logger.info('.env file found and successfully parsed!');
  }

  public get<T extends keyof TRestSchema>(key: T):TRestSchema[T] {
    return this.config[key];
  }
}
