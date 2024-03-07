import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import { BaseController, HttpMethod, HttpError, RequestQuery } from '../../../rest/index.js';
import { Component } from '../../../types/component-enum.js';
import { Logger } from '../../logger/logger.interface.js';
import { OfferService } from './offer-service.interface.js';
import { fillDTO } from '../../../helpers/common.js';
import { OfferRdo } from './index.js';
import { OfferDetailsRdo } from './rdo/offer-details.rdo.js';
import { StatusCodes } from 'http-status-codes';
import { CreateOfferRequest } from './types/create-offer-request.type.js';
import { ParamOfferId } from './types/param-offerid.type.js';
import { UpdateOfferDto } from './dto/update-offer.dto.js';
import { CommentService } from '../comment/comment-service.interface.js';
import { CommentRdo } from '../comment/rdo/comment.rdo.js';

@injectable()
export class OfferController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger:Logger,
    @inject(Component.OfferService) private readonly offerService: OfferService,
    @inject(Component.CommentService) private readonly commentService: CommentService
  ){
    super(logger);
    this.logger.info('Register routes for OfferController...');
    this.addRoute({ path: '/', method: HttpMethod.GET, handler: this.index });
    this.addRoute({ path: '/new', method: HttpMethod.POST, handler: this.create });
    this.addRoute({ path: '/:offerID', method: HttpMethod.GET, handler: this.showDetails });
    this.addRoute({ path: '/:offerID', method: HttpMethod.DELETE, handler: this.delete });
    this.addRoute({ path: '/:offerID', method: HttpMethod.PATCH, handler: this.update });
    this.addRoute({ path: '/:offerID/comments', method: HttpMethod.GET, handler: this.getComments });
  }

  public async index(req: Request, res: Response): Promise<void> {
    const offers = await this.offerService.find(Number(req.query.limit));
    const responseData = fillDTO(OfferRdo, offers);
    this.ok(res, responseData);
  }

  public async create({ body }: CreateOfferRequest, res: Response): Promise<void> {
    const result = await this.offerService.create(body);
    this.created(res, fillDTO(OfferDetailsRdo, result));
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
    if (! await this.offerService.exists(req.params.offerID)) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id «${req.params.offerID}» not found.`,
        'OfferController'
      );
    }
    const offerDeleted = await this.offerService.deleteById(req.params.offerID);
    await this.commentService.deleteByOfferID(req.params.offerID);
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
    if (!offerUpdate) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id «${params.offerID}» not found.`,
        'OfferController'
      );
    }
    const responseData = fillDTO(OfferDetailsRdo, offerUpdate);
    this.ok(res, responseData);
  }

  public async getComments ({ params, query }: Request<ParamOfferId, unknown, unknown, RequestQuery>, res: Response): Promise<void> {
    if (! await this.offerService.exists(params.offerID)) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id «${params.offerID}» not found.`,
        'OfferController'
      );
    }
    console.log('limit value - ', query.limit);
    const comments = await this.commentService.findByOfferId(params.offerID, Number(query.limit));
    const responseData = fillDTO(CommentRdo, comments);
    this.ok(res, responseData);
  }
}
