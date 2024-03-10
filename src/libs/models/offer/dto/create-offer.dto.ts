import { ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean, IsDateString, IsEnum, IsInt, IsMongoId, Max, MaxLength, Min, MinLength } from 'class-validator';
import { OfferTitleLength, OfferDescriptionLength, PHOTOS_COUNT, Rating, Rooms, Adults, Price } from '../../../../const.js';
import { CreateOfferValidationMessage } from './create-offer.message.js';
import { ECity,EHousingType, EConvinience } from '../../../../types/index.js';
export class CreateOfferDto {
  @MinLength(OfferTitleLength.MIN, { message: CreateOfferValidationMessage.title.minLength })
  @MaxLength(OfferTitleLength.MAX, { message: CreateOfferValidationMessage.title.maxLength })
  public title: string;

  @MinLength(OfferDescriptionLength.MIN, { message: CreateOfferValidationMessage.description.minLength })
  @MaxLength(OfferDescriptionLength.MAX, { message: CreateOfferValidationMessage.description.maxLength })
  public description: string;

  @IsDateString({}, { message: CreateOfferValidationMessage.postDate.invalidFormat })
  public date: string;

  @IsEnum(ECity, { message: CreateOfferValidationMessage.city.invalid })
  public city: string;

  public previewImg: string;

  @IsArray({message: CreateOfferValidationMessage.photos.invalidFormat})
  @ArrayMinSize(PHOTOS_COUNT, {message: CreateOfferValidationMessage.photos.minArrayLength})
  @ArrayMaxSize(PHOTOS_COUNT, {message: CreateOfferValidationMessage.photos.maxArrayLength}) // TODO соответствие расширений
  public photos: string[];

  @IsBoolean()
  public isPremium: boolean;

  @Min(Rating.MIN, {message: CreateOfferValidationMessage.rating.minValue}) //TODO 1 знак после запятой
  @Max(Rating.MAX, {message: CreateOfferValidationMessage.rating.maxValue})
  public rating: number;

  @IsEnum(EHousingType, { message: CreateOfferValidationMessage.housingType.invalid})
  public housingType: string;

  @Min(Rooms.MIN, {message: CreateOfferValidationMessage.rooms.minValue})
  @Max(Rooms.MAX, {message: CreateOfferValidationMessage.rooms.maxValue})
  public rooms: number;

  @Min(Adults.MIN, {message: CreateOfferValidationMessage.adults.minValue})
  @Max(Adults.MAX, {message: CreateOfferValidationMessage.adults.maxValue})
  public adults: number;

  @Min(Price.MIN, {message: CreateOfferValidationMessage.price.minValue})
  @Max(Price.MAX, {message: CreateOfferValidationMessage.price.maxValue}) // TODO - число с 1 знаком после запятой
  public price: number;

  @IsArray({message: CreateOfferValidationMessage.conveniences.invalidFormat})
  @IsEnum(EConvinience, { each: true, message: CreateOfferValidationMessage.conveniences.invalid })
  public conveniences: string[];

  @IsMongoId({ message: CreateOfferValidationMessage.authorID.invalidId })
  public authorID: string;

  @IsInt({ message: CreateOfferValidationMessage.commentsCount.invalidFormat })
  public commentsCount: number;
}
