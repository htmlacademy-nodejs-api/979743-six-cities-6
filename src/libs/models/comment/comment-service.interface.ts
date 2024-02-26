import { DocumentType } from '@typegoose/typegoose';
import { CreateCommentDto } from './dto/create-comment.dto.js';
import { CommentEntity } from './comment.entity.js';

export interface CommentService {
  create(dto: CreateCommentDto): Promise<DocumentType<CommentEntity>>;
  findByOfferId(offerID: string): Promise<DocumentType<CommentEntity>[]>;
  deleteByOfferID(offerID: string): Promise<number | null>;
}
