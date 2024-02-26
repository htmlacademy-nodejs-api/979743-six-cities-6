import { defaultClasses, getModelForClass, modelOptions, prop, Ref } from '@typegoose/typegoose';
import { UserEntity } from '../user/user.entity.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface OfferEntity extends defaultClasses.Base {}

modelOptions({
  schemaOptions: {
    collection: 'offers',
    timestamps: true,
  }
});

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class OfferEntity extends defaultClasses.TimeStamps {
  @prop({
    trim: true,
    required: true,
  })
  public title!: string;

  @prop({
    trim: true,
    required: true,
  })
  public description!: string;

  @prop({ required: true })
  public date!: string;

  @prop({ required: true, })
  public city!: string;

  @prop({ required: true })
  public previewImg!: string;

  @prop({ required: true })
  public photos!: string[];

  @prop({ required: true })
  public isPremium!: boolean;

  @prop({ required: true })
  public rating!: number;

  @prop({ required: true })
  public housingType!: string;

  @prop({ required: true })
  public rooms!: number;

  @prop({ required: true })
  public adults!: number;

  @prop({ required: true })
  public price!: number;

  @prop({ required: true })
  public conveniences!: string[];

  @prop({
    ref: UserEntity,
    required: true,
  })
  public authorID!: Ref<UserEntity>;

  @prop({default: 0})
  public commentsCount!: number;
}

export const OfferModel = getModelForClass(OfferEntity);
