import { inject, injectable } from 'inversify';
import { CommentService } from './comment-service.interface.js';
import { Logger } from '../../logger/index.js';
import { Component } from '../../../types/component-enum.js';
import { types, DocumentType } from '@typegoose/typegoose';
import { CommentEntity } from './comment.entity.js';
import { CreateCommentDto } from './dto/create-comment.dto.js';
import { OfferLimits } from '../offer/offer.constant.js';
@injectable()
export class DefaultCommentService implements CommentService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.CommentModel) private readonly commentModel: types.ModelType<CommentEntity>
  ) {}

  public async create(dto: CreateCommentDto): Promise<DocumentType<CommentEntity>> {
    const comment = await this.commentModel.create(dto);
    this.logger.info(`New comment created by ${dto.authorID}`);
    return comment
      .populate('authorID');
  }

  public async findByOfferId(offerId: string, count?: number): Promise<DocumentType<CommentEntity>[]> {
    const limit = count ? count : OfferLimits.COMMENTS_COUNT;
    return this.commentModel
      .find({offerID: offerId}, {}, {limit})
      .populate('authorID')
      .exec();
  }

  public async deleteByOfferID(offerID: string): Promise<number> {
    const result = await this.commentModel
      .deleteMany({offerID})
      .exec();

    return result.deletedCount;
  }
}
