import 'reflect-metadata';
import { RestApplication } from './rest/index.js';
import { Component } from './types/index.js';
import { appContainer } from './container.js';

async function bootstrap() {
  const application = appContainer.get<RestApplication>(Component.RestApplication);
  await application.init();
}

bootstrap();
