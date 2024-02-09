import 'reflect-metadata';
import { RestApplication } from './rest/index.js';
import { Component } from './types/index.js';
import { container } from './rest/container.js';

async function bootstrap() {
  const application = container.get<RestApplication>(Component.RestApplication);
  await application.init();
}

bootstrap();
