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
    this.addRoute({ path: '/:offerID', method: HttpMethod.DELETE, handler: this.delete });
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
    this.ok(res, offerDeleted);
    this.logger.info(`offer ${req.params.offerID} deleted`);
  }
}
