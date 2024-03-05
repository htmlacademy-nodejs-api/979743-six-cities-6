import { inject, injectable } from 'inversify';
import { Logger } from '../libs/logger/index.js';
import { Config } from '../libs/config/index.js';
import { TRestSchema } from '../types/index.js';
import { Component } from '../types/index.js';
import { IDatabaseClient } from '../libs/db-client/index.js';
import { getMongoURI } from '../helpers/index.js';
// import { OfferService } from '../libs/models/offer/offer-service.interface.js';
// import { CommentService } from '../libs/models/comment/comment-service.interface.js';
// import { UserService } from '../libs/models/user/user-serice.interface.js';

@injectable()
export class RestApplication {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.Config) private readonly config: Config<TRestSchema>,
    @inject(Component.IDatabaseClient) private readonly databaseClient: IDatabaseClient,
    //тест запроса к БД на получение данных
    // @inject(Component.OfferService) private readonly offerService: OfferService,
    // @inject(Component.CommentService) private readonly commentService: CommentService,
    // @inject(Component.UserService) private readonly userService: UserService,
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

    // const testRequire = await this.offerService.find();
    // const testRequire = await this.offerService.findByID('65df41d1ad886aa48cd3dc5f');
    // const testRequire = await this.commentService.create({
    //   text: 'комментарий к офферу 65e3294d799c63847c713350',
    //   authorID: '65e3294d799c63847c713353',
    //   offerID: '65e3294d799c63847c713350',
    // });

    // const testRequire = await this.userService.updateById(
    //   '65e3294d799c63847c713344',
    //   {favoritesOffers: ['65e3294d799c63847c71334b', '65e3294d799c63847c713350']}
    // );
    // console.log(testRequire);
  }
}
