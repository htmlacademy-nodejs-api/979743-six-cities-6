import { defaultClasses, getModelForClass, modelOptions, prop, Ref } from '@typegoose/typegoose';
import { ECity, EConvinience, EHousingType } from '../../../types/index.js';
import { MaxValue, MIN_VALUE, OfferDescriptionLength, OfferTitleLength, Price } from '../../../const.js';
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
    minlength: OfferTitleLength.MIN,
    maxlength: OfferTitleLength.MAX,
  })
  public title: string;

  @prop({
    trim: true,
    required: true,
    minlength: OfferDescriptionLength.MIN,
    maxlength: OfferDescriptionLength.MAX,
  })
  public description: string;

  @prop({ required: true })
  public date: Date;

  @prop({
    required: true,
    type: () => String,
    enum: ECity,
  })
  public city: ECity;

  @prop({ required: true })
  public previewImg: string;

  @prop({ required: true })
  public photos: string[];

  @prop({ required: true })
  public isPremium: boolean;

  @prop({ required: true })
  public isFavorites: boolean;

  @prop({
    required: true,
    min: MIN_VALUE,
    max: MaxValue.RATING,
  })
  public rating: number;

  @prop({
    required: true,
    type: () => String,
    enum: EHousingType,
  })
  public housingType: EHousingType;

  @prop({
    required: true,
    min: MIN_VALUE,
    max: MaxValue.ROOMS,
  })
  public rooms: number;

  @prop({
    required: true,
    min: MIN_VALUE,
    max: MaxValue.ADULTS,
  })
  public adults: number;

  @prop({
    required: true,
    min: Price.MIN,
    max: Price.MAX,
  })
  public price: number;

  @prop({
    required: true,
    type: () => String,
    enum: EConvinience,
  })
  public conveniences: EConvinience[];

  @prop({
    ref: UserEntity,
    required: true,
  })
  public authorID: Ref<UserEntity>; // строка ID или объект user со всеми данными? // TODO

  @prop({default: 0})
  public commentsCount: number;
}

export const OfferModel = getModelForClass(OfferEntity);
