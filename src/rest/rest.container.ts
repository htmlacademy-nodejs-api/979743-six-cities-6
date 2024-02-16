import { Container } from 'inversify';
import { RestApplication } from './rest.application.js';
import { Component } from '../types/component-enum.js';
import { Logger, PinoLogger } from '../libs/logger/index.js';
import { Config, RestConfig } from '../libs/config/index.js';
import { TRestSchema } from '../types/rest-schema-type.js';
import { DatabaseClient, MongoDatabaseClient } from '../libs/db-client/index.js';

export function createRestApplicationContainer() {
  const restApplicationContainer = new Container();

  restApplicationContainer.bind<RestApplication>(Component.RestApplication).to(RestApplication).inSingletonScope();
  restApplicationContainer.bind<Logger>(Component.Logger).to(PinoLogger).inSingletonScope();
  restApplicationContainer.bind<Config<TRestSchema>>(Component.Config).to(RestConfig).inSingletonScope();
  restApplicationContainer.bind<DatabaseClient>(Component.DatabaseClient).to(MongoDatabaseClient).inSingletonScope();

  return restApplicationContainer;
}
