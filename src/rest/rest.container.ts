import { Container } from 'inversify';
import { RestApplication } from './rest.application.js';
import { Component } from '../types/component-enum.js';
import { Logger, PinoLogger } from '../libs/logger/index.js';
import { Config, RestConfig } from '../libs/config/index.js';
import { TRestSchema } from '../types/rest-schema-type.js';
import { IDatabaseClient, MongoDatabaseClient } from '../libs/db-client/index.js';
import { ExceptionFilter } from './exception-filter/exception-filter.interface.js';
import { AppExceptionFilter } from './exception-filter/app-exception-filter.js';

export function createRestApplicationContainer() {
  const restApplicationContainer = new Container();

  restApplicationContainer.bind<RestApplication>(Component.RestApplication).to(RestApplication).inSingletonScope();
  restApplicationContainer.bind<Logger>(Component.Logger).to(PinoLogger).inSingletonScope();
  restApplicationContainer.bind<Config<TRestSchema>>(Component.Config).to(RestConfig).inSingletonScope();
  restApplicationContainer.bind<IDatabaseClient>(Component.IDatabaseClient).to(MongoDatabaseClient).inSingletonScope();
  restApplicationContainer.bind<ExceptionFilter>(Component.ExceptionFilter).to(AppExceptionFilter).inSingletonScope();

  return restApplicationContainer;
}
