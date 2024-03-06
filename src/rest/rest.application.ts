import { inject, injectable } from 'inversify';
import express, { Express } from 'express';
import { Logger } from '../libs/logger/index.js';
import { Config } from '../libs/config/index.js';
import { TRestSchema } from '../types/index.js';
import { Component } from '../types/index.js';
import { IDatabaseClient } from '../libs/db-client/index.js';
import { getMongoURI } from '../helpers/index.js';
import { Controller } from './controller/controller.interface.js';
import { ExceptionFilter } from './exception-filter/exception-filter.interface.js';

@injectable()
export class RestApplication {
  private readonly server: Express;

  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.Config) private readonly config: Config<TRestSchema>,
    @inject(Component.IDatabaseClient) private readonly databaseClient: IDatabaseClient,
    @inject(Component.OfferController) private readonly offerController: Controller,
    @inject(Component.ExceptionFilter) private readonly appExceptionFilter: ExceptionFilter,
    @inject(Component.UserController) private readonly userController: Controller,

  ) {
    this.server = express();
  }

  private async initDb() {
    const mongoUri = getMongoURI(
      this.config.get('DB_USER'),
      this.config.get('DB_PASSWORD'),
      this.config.get('DB_HOST'),
      this.config.get('DB_PORT'),
      this.config.get('DB_NAME'),
    );

    return this.databaseClient.connect(mongoUri);
  }

  private async initServer() {
    const port = this.config.get('PORT');
    this.server.listen(port);
  }

  private async initControllers() {
    this.server.use('/offers', this.offerController.router);
    this.server.use('/users', this.userController.router);
  }

  private async initMiddleware() {
    this.server.use(express.json());
  }

  private async initExceptionFilters() {
    this.server.use(this.appExceptionFilter.catch.bind(this.appExceptionFilter));
  }

  public async init() {
    this.logger.info('Application initialization');
    this.logger.info(`Get value from env $PORT: ${this.config.get('PORT')}`);

    this.logger.info('Init database…');
    await this.initDb();
    this.logger.info('Init database completed');

    this.logger.info('Init app-level middleware...');
    await this.initMiddleware();
    this.logger.info('App-level middleware initialization completed');

    this.logger.info('Init controllers...');
    await this.initControllers();
    this.logger.info('Controller initialization completed');

    this.logger.info('Init exception filters...');
    await this.initExceptionFilters();
    this.logger.info('Exception filters initialization compleated');

    this.logger.info('Try to init server...');
    await this.initServer();
    this.logger.info(`Server started on http://localhost:${this.config.get('PORT')}`);
  }
}
