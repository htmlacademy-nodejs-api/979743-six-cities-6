import { IsString, Length, Min, Max, IsMongoId } from 'class-validator';
import { CommentValidationMessage } from './create-comment.message.js';
import { CommentsLength, Rating } from '../../../../const.js';

export class CreateCommentDto {
  @IsString({message: CommentValidationMessage.text.invalidFormat})
  @Length(CommentsLength.MIN, CommentsLength.MAX, {message: CommentValidationMessage.text.lengthField})
  public text: string;

  @Min(Rating.MIN, {message: CommentValidationMessage.rating.minValue})
  @Max(Rating.MAX, {message: CommentValidationMessage.rating.maxValue})
  public rating: number;

  public authorID: string;

  @IsMongoId({message: CommentValidationMessage.offerID.invalidId})
  public offerID: string;
}
