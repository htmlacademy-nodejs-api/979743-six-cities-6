import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import { BaseController, HttpMethod } from '../../../rest/index.js';
import { Component } from '../../../types/component-enum.js';
import { Logger } from '../../logger/logger.interface.js';
import { HttpError } from '../../../rest/index.js';
import { OfferService } from './offer-service.interface.js';
import { CreateOfferDto } from './dto/create-offer.dto.js';
import { fillDTO } from '../../../helpers/common.js';
import { OfferRdo } from './index.js';
import { StatusCodes } from 'http-status-codes';
import { UpdateUserDto } from '../user/dto/update-user.dto.js';

@injectable()
export class OfferController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger:Logger,
    @inject(Component.OfferService) private readonly offerService: OfferService,
  ){
    super(logger);
    this.logger.info('Register routes for OfferController...');
    this.addRoute({ path: '/', method: HttpMethod.GET, handler: this.index });
    this.addRoute({ path: '/new', method: HttpMethod.POST, handler: this.create });
    this.addRoute({ path: '/:offerID', method: HttpMethod.GET, handler: this.details });
    this.addRoute({ path: '/:offerID', method: HttpMethod.PATCH, handler: this.update });
  }

  public async index(_req: Request, res: Response): Promise<void> {
    const offers = await this.offerService.find();
    const responseData = fillDTO(OfferRdo, offers);
    this.ok(res, responseData);
  }

  public async create({ body }: Request<Record<string, unknown>, Record<string, unknown>, CreateOfferDto>, res: Response): Promise<void> {
    const result = await this.offerService.create(body);
    this.created(res, fillDTO(OfferRdo, result));
    this.logger.info('New offer created');
  }

  public async details (req: Request, res: Response): Promise<void> {
    const offerDetails = await this.offerService.findByID(req.params.offerID);
    if(!offerDetails) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id «${req.params.offerID}» not found.`,
        'OfferController'
      );
    }
    const responseData = fillDTO(OfferRdo, offerDetails);
    this.ok(res, responseData);
  }

  public async delete (req: Request, res: Response): Promise<void> {
    const offerDeleted = await this.offerService.deleteById(req.params.offerID);
    if (!offerDeleted) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id «${req.params.offerID}» not found.`,
        'OfferController'
      );
    }
    this.ok(res, offerDeleted); // как сделать, чтоб ничего не возвращать?
    this.logger.info(`offer ${req.params.offerID} deleted`);
  }

  public async update ({body, params}: Request, res: Response): Promise<void> { // как указать тип update-offer-dto для body?
    const offerUpdate = await this.offerService.updateById(params.offerID, body);
    if (!offerUpdate) { // как узнать, почему именно сервер не вернул данные? Надо обработать разные ошибки.
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id «${params.offerID}» not found.`,
        'OfferController'
      );
    }
    const responseData = fillDTO(OfferRdo, offerUpdate);
    this.ok(res, responseData);
  }
}
