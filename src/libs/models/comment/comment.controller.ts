import { inject, injectable } from 'inversify';
import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { BaseController, ValidateDtoMiddleware } from '../../../rest/index.js';
import { Component } from '../../../types/component-enum.js';
import { Logger } from '../../logger/logger.interface.js';
import { CommentService } from './comment-service.interface.js';
import { HttpMethod } from '../../../rest/index.js';
import { CreateCommentRequest } from './types/create-comment-request.type.js';
import { fillDTO } from '../../../helpers/common.js';
import { CommentRdo } from './rdo/comment.rdo.js';
import { OfferService } from '../offer/offer-service.interface.js';
import { HttpError } from '../../../rest/index.js';
import { CreateCommentDto } from './dto/create-comment.dto.js';

@injectable()
export class CommentController extends BaseController {
  constructor (
    @inject(Component.Logger) protected readonly logger:Logger,
    @inject(Component.CommentService) private readonly commentService: CommentService,
    @inject(Component.OfferService) private readonly offerService: OfferService
  ) {
    super(logger);
    this.logger.info('Register routes for OfferController...');
    this.addRoute({
      path: '/new',
      method: HttpMethod.POST,
      handler: this.create,
      middlewares: [
        new ValidateDtoMiddleware(CreateCommentDto)
      ]
    });
  }

  public async create({ body }: CreateCommentRequest, res: Response): Promise<void> {
    if (! await this.offerService.exists(body.offerID)) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${body.offerID} not found.`,
        'CommentController'
      );
    }
    const newComment = await this.commentService.create(body);
    await this.offerService.incCommentCount(body.offerID);
    this.created(res, fillDTO(CommentRdo, newComment));
    this.logger.info('New comment created');
  }
}
