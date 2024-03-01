import { inject, injectable } from 'inversify';
import { Logger } from '../libs/logger/index.js';
import { Config } from '../libs/config/index.js';
import { TRestSchema } from '../types/index.js';
import { Component } from '../types/index.js';
import { IDatabaseClient } from '../libs/db-client/index.js';
import { getMongoURI } from '../helpers/index.js';
import { OfferService } from '../libs/models/offer/offer-service.interface.js';
// import { CommentService } from '../libs/models/comment/comment-service.interface.js';

@injectable()
export class RestApplication {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.Config) private readonly config: Config<TRestSchema>,
    @inject(Component.IDatabaseClient) private readonly databaseClient: IDatabaseClient,
    //тест запроса к БД на получение данных
    @inject(Component.OfferService) private readonly offerService: OfferService,
    // @inject(Component.CommentService) private readonly commentService: CommentService,
  ) {}

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

  public async init() {
    this.logger.info('Application initialization');
    this.logger.info(`Get value from env $PORT: ${this.config.get('PORT')}`);

    this.logger.info('Init database…');
    await this.initDb();
    this.logger.info('Init database completed');

    const testRequire = await this.offerService.find();
    // const testRequire = await this.offerService.findByID('65df41d0ad886aa48cd3dc52');
    // const testRequire = await this.commentService.create({
    //   text: 'комментарий еще один к этому же офферу',
    //   authorID: '65df41d1ad886aa48cd3dc5c',
    //   offerID: '65e0d33ca2cbe34c9b8f8c83',
    // });

    console.log(testRequire);
  }
}
