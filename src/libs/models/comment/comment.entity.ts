import { defaultClasses, modelOptions, prop, Ref, getModelForClass } from '@typegoose/typegoose';
import { OfferEntity } from '../offer/index.js';
import { UserEntity } from '../user/index.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface CommentEntity extends defaultClasses.Base {}

modelOptions({
  schemaOptions: {
    collection: 'comments',
    timestamps: true,
  }
});

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class CommentEntity extends defaultClasses.TimeStamps {
  @prop({ required: true })
  public text: string;

  @prop({ required: true })
  public commentDate: string;

  @prop({
    required: true,
    ref: UserEntity,
  })
  public authorID: Ref<UserEntity>;

  @prop({
    required: true,
    ref: OfferEntity,
  })
  public offerID: Ref<OfferEntity>;
}

export const CommentModel = getModelForClass(CommentEntity);
