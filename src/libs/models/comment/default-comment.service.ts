import { inject, injectable } from 'inversify';
import { CommentService } from './comment-service.interface.js';
import { Component } from '../../../types/component-enum.js';
import { types, DocumentType } from '@typegoose/typegoose';
import { CommentEntity } from './comment.entity.js';
import { CreateCommentDto } from './dto/create-comment.dto.js';


@injectable()
export class DefaultCommentService implements CommentService {
  constructor(
    @inject(Component.CommentModel) private readonly commentModel: types.ModelType<CommentEntity>
  ) {}

  public async create(dto: CreateCommentDto): Promise<DocumentType<CommentEntity>> {
    console.log('func create in comment service is running.');
    const comment = await this.commentModel.create(dto);
    return comment.populate('authorID');
  }

  public async findByOfferId(offerId: string): Promise<DocumentType<CommentEntity>[]> {
    return this.commentModel
      .find({offerId})
      .populate('userID');
  }

  public async deleteByOfferID(offerID: string): Promise<number> {
    const result = await this.commentModel
      .deleteMany({offerID})
      .exec();

    return result.deletedCount;
  }
}
