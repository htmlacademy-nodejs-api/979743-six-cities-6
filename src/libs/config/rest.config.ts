import { config } from 'dotenv';
import { Config } from './config.interface.js';
import { Logger } from '../logger/index.js';
import { configRestSchema, TRestSchema } from './rest.schema.js';

export class RestConfig implements Config<TRestSchema> {
  private readonly config: TRestSchema;

  constructor(
    private readonly logger: Logger
  ) {
    const parsedOutput = config();
    if (parsedOutput.error) {
      throw new Error('Can\'t read .env file. Perhaps the file does not exists.');
    }
    // this.config = <DotenvParseOutput>parsedOutput.parsed;
    configRestSchema.load({});
    configRestSchema.validate({allowed: 'strict', output: this.logger.info});
    this.config = configRestSchema.getProperties();

    this.logger.info('.env file found and successfully parsed!');
  }

  // public get(key: string): string | undefined {
  public get<T extends keyof TRestSchema>(key: T):TRestSchema[T] {
    return this.config[key];
  }
}
