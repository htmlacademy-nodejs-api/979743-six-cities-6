import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import {
  BaseController,
  HttpMethod,
  HttpError,
  RequestQuery,
  ValidateObjectIdMiddleware,
  ValidateDtoMiddleware,
  DocumentExistsMiddleware,
  PrivateRouteMiddleware,
} from '../../../rest/index.js';
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
import { CreateOfferDto } from './dto/create-offer.dto.js';
import { UserService } from '../user/user-serice.interface.js';

@injectable()
export class OfferController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger:Logger,
    @inject(Component.OfferService) private readonly offerService: OfferService,
    @inject(Component.CommentService) private readonly commentService: CommentService,
    @inject(Component.UserService) private readonly userService: UserService,
  ){
    super(logger);
    this.logger.info('Register routes for OfferController...');

    this.addRoute({
      path: '/',
      method: HttpMethod.GET,
      handler: this.index
    });
    this.addRoute({
      path: '/premium',
      method: HttpMethod.GET,
      handler: this.getPremium
    });
    this.addRoute({
      path: '/new',
      method: HttpMethod.POST,
      handler: this.create,
      middlewares:[
        new PrivateRouteMiddleware(),
        new ValidateDtoMiddleware(CreateOfferDto)
      ]
    });
    this.addRoute({
      path: '/:offerID',
      method: HttpMethod.GET,
      handler: this.showDetails,
      middlewares: [
        new ValidateObjectIdMiddleware('offerID')
      ]
    });
    this.addRoute({
      path: '/:offerID',
      method: HttpMethod.DELETE,
      handler: this.delete,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerID'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerID'),
      ]
    });
    this.addRoute({
      path: '/:offerID',
      method: HttpMethod.PATCH,
      handler: this.update,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerID'),
        new ValidateDtoMiddleware(UpdateOfferDto)
      ]
    });
    this.addRoute({
      path: '/:offerID/comments',
      method: HttpMethod.GET,
      handler: this.getComments,
      middlewares: [
        new ValidateObjectIdMiddleware('offerID'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerID'),
      ]
    });
    this.addRoute({
      path: '/favorites',
      method: HttpMethod.GET,
      handler: this.getFavorites,
      middlewares: [
        new PrivateRouteMiddleware(),
      ]
    });
  }

  public async index(req: Request, res: Response): Promise<void> {
    const offers = await this.offerService.find(Number(req.query.limit));
    const responseData = fillDTO(OfferRdo, offers);
    this.ok(res, responseData);
  }

  public async create({ body, tokenPayload }: CreateOfferRequest, res: Response): Promise<void> {
    const result = await this.offerService.create({...body, authorID: tokenPayload.id});
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

  public async getPremium (_req: Request, res: Response): Promise<void> {
    const offers = await this.offerService.findPremium();
    const responseData = fillDTO(OfferRdo, offers);
    this.ok(res, responseData);
  }

  public async delete (req: Request, res: Response): Promise<void> {
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
    const comments = await this.commentService.findByOfferId(params.offerID, Number(query.limit));
    const responseData = fillDTO(CommentRdo, comments);
    this.ok(res, responseData);
  }

  public async getFavorites({tokenPayload}: Request, res: Response) {
    const foundedUser = await this.userService.findByEmail(tokenPayload.email);
    if (!foundedUser) {
      throw new HttpError(
        StatusCodes.NO_CONTENT,
        `User «${tokenPayload.email}» has not favorits offers list.`,
        'OfferController'
      );
    }
    console.log('foundedUser.favoritesOffers - ', foundedUser.favoritesOffers);
    const offers = await this.offerService.findFavorites(foundedUser.favoritesOffers);
    const responseData = fillDTO(OfferRdo, offers);
    this.ok(res, responseData);
  }
}
