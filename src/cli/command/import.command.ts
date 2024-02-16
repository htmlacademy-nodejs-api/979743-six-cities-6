import { Command } from './command.interface.js';
import { DEFAULT_DB_PORT, DEFAULT_USER_PASSWORD, IMPORT_COMMAND } from './consts.js';
import { TSVFileReader } from '../../libs/file-reader/tsv-file-reader.js';
import { createOffer } from '../../helpers/offer.js';
import { getErrorMessage } from '../../helpers/common.js';
import { DefaultUserService, UserModel, UserService } from '../../libs/models/user/index.js';
import { DefaultOfferService, OfferModel, OfferService } from '../../libs/models/offer/index.js';
import { DatabaseClient } from '../../libs/db-client/db-client.interface.js';
import { Logger } from '../../libs/logger/logger.interface.js';
import { ConsoleLogger } from '../../libs/logger/console.logger.js';
import { MongoDatabaseClient } from '../../libs/db-client/mongo.bd-client.js';
import { IOffer } from '../../types/offer-type.js';
import { getMongoURI } from '../../helpers/database.js';
export class ImportCommand implements Command {
  private userService: UserService;
  private offerServise: OfferService;
  private databaseClient: DatabaseClient;
  private logger: Logger;
  private salt: string;

  constructor() {
    this.onImportedLine = this.onImportedLine.bind(this);
    this.onCompleteImport = this.onCompleteImport.bind(this);

    this.logger = new ConsoleLogger();
    this.userService = new DefaultUserService(this.logger, UserModel);
    this.offerServise = new DefaultOfferService(this.logger, OfferModel);
    this.databaseClient = new MongoDatabaseClient(this.logger);
  }

  public get name(): string {
    return IMPORT_COMMAND;
  }

  private async saveOffer(offer: IOffer) {
    const user = await this.userService.findOrCreate({
      ...offer.user, // в оффере я храню только id автора, как мне передать сюда весь объект автора???
      password: DEFAULT_USER_PASSWORD,
    }, this.salt);

    await this.offerServise.create({
      title: offer.title,
      description: offer.description,
      date: offer.date,
      city: offer.city,
      previewImg: offer.previewImg,
      photos: offer.photos,
      isPremium: offer.isPremium,
      isFavorites: offer.isFavorites,
      rating: offer.rating,
      housingType: offer.housingType,
      rooms: offer.rooms,
      adults: offer.adults,
      price: offer.price,
      conveniences: offer.conveniences,
      authorID: user.id,
      commentsCount: offer.commentsCount,
    });
  }

  private async onImportedLine(line: string, resolve: () => void) {
    const offer = createOffer(line);
    await this.saveOffer(offer);
    resolve();
  }

  private onCompleteImport(count: number) {
    console.info(`${count} rows imported.`);
    this.databaseClient.disconnect();
  }

  public async execute(filename: string, login: string, password: string, host: string, dbname: string, salt: string): Promise<void> {
    // const [filename] = parameters;
    const uri = getMongoURI(login, password, host, DEFAULT_DB_PORT, dbname);
    this.salt = salt;
    await this.databaseClient.connect(uri);
    const fileReader = new TSVFileReader(filename.trim());
    fileReader.on('line', this.onImportedLine);
    fileReader.on('end', this.onCompleteImport);

    try {
      await fileReader.read();
    } catch (error) {
      console.error(`Can't import data from file: ${filename}`);
      console.error(getErrorMessage(error));
    }
  }
}
