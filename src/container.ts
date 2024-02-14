import { Container } from 'inversify';
import { RestApplication } from './rest/rest.application.js';
import { Component, TRestSchema } from './types/index.js';
import { PinoLogger, Logger } from './libs/logger/index.js';
import { RestConfig, Config } from './libs/config/index.js';
import { DatabaseClient, MongoDatabaseClient } from './libs/db-client/index.js';

export const container = new Container();
container.bind<RestApplication>(Component.RestApplication).to(RestApplication).inSingletonScope();
container.bind<Logger>(Component.Logger).to(PinoLogger).inSingletonScope();
container.bind<Config<TRestSchema>>(Component.Config).to(RestConfig).inSingletonScope();
container.bind<DatabaseClient>(Component.DatabaseClient).to(MongoDatabaseClient).inSingletonScope();
