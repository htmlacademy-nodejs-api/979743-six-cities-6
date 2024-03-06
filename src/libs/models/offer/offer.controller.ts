import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import { BaseController, HttpMethod } from '../../../rest/index.js';
import { Component } from '../../../types/component-enum.js';
import { Logger } from '../../logger/logger.interface.js';
import { HttpError } from '../../../rest/index.js';
import { OfferService } from './offer-service.interface.js';
import { fillDTO } from '../../../helpers/common.js';
import { OfferRdo } from './index.js';
import { OfferDetailsRdo } from './rdo/offer-details.rdo.js';
import { StatusCodes } from 'http-status-codes';
import { CreateOfferRequest } from './types/create-offer-request.type.js';
import { ParamOfferId } from './types/param-offerid.type.js';
import { UpdateOfferDto } from './dto/update-offer.dto.js';

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
    this.addRoute({ path: '/:offerID', method: HttpMethod.GET, handler: this.showDetails });
    this.addRoute({ path: '/:offerID', method: HttpMethod.DELETE, handler: this.delete });
    this.addRoute({ path: '/:offerID', method: HttpMethod.PATCH, handler: this.update });
  }

  public async index(_req: Request, res: Response): Promise<void> {
    const offers = await this.offerService.find();
    const responseData = fillDTO(OfferRdo, offers);
    this.ok(res, responseData);
  }

  public async create({ body }: CreateOfferRequest, res: Response): Promise<void> {
    const result = await this.offerService.create(body);
    this.created(res, fillDTO(OfferRdo, result));
    this.logger.info('New offer created');
  }

  public async showDetails ({ params }: Request<ParamOfferId>, res: Response): Promise<void> {
    const offerDetails = await this.offerService.findByID(params.offerID);
    if(!offerDetails) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id «${params.offerID}» not found.`,
        'OfferController'
      );
    }
    const responseData = fillDTO(OfferDetailsRdo, offerDetails);
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
    this.noContent(res, offerDeleted);
    this.logger.info(`offer ${req.params.offerID} deleted`);
  }

  public async update ({ body, params }: Request<ParamOfferId, unknown, UpdateOfferDto>, res: Response): Promise<void> {
    const offerUpdate = await this.offerService.updateById(params.offerID, body);
    if (!offerUpdate) { // как узнать, почему именно сервер не вернул данные? Надо обработать разные ошибки.
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id «${params.offerID}» not found.`,
        'OfferController'
      );
    }
    const responseData = fillDTO(OfferDetailsRdo, offerUpdate);
    this.ok(res, responseData);
  }
}
