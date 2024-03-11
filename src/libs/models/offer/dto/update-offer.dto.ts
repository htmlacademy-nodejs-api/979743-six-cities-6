import { ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean, IsDateString, IsEnum, IsInt, IsMongoId, IsOptional, Max, MaxLength, Min, MinLength } from 'class-validator';
import { Adults, OfferDescriptionLength, OfferTitleLength, PHOTOS_COUNT, Price, Rating, Rooms } from '../../../../const.js';
import { CreateOfferValidationMessage } from './create-offer.message.js';
import { ECity, EHousingType, EConvinience } from '../../../../types/index.js';
export class UpdateOfferDto {
  @IsOptional()
  @MinLength(OfferTitleLength.MIN, { message: CreateOfferValidationMessage.title.minLength })
  @MaxLength(OfferTitleLength.MAX, { message: CreateOfferValidationMessage.title.maxLength })
  public title?: string;

  @IsOptional()
  @MinLength(OfferDescriptionLength.MIN, { message: CreateOfferValidationMessage.description.minLength })
  @MaxLength(OfferDescriptionLength.MAX, { message: CreateOfferValidationMessage.description.maxLength })
  public description?: string;

  @IsOptional()
  @IsDateString({}, { message: CreateOfferValidationMessage.postDate.invalidFormat })
  public date?: Date;

  @IsOptional()
  @IsEnum(ECity, { message: CreateOfferValidationMessage.city.invalid })
  public city?: string;

  @IsOptional()
  @IsBoolean()
  public previewImg?: string;

  @IsOptional()
  @IsArray({message: CreateOfferValidationMessage.photos.invalidFormat})
  @ArrayMinSize(PHOTOS_COUNT, {message: CreateOfferValidationMessage.photos.minArrayLength})
  @ArrayMaxSize(PHOTOS_COUNT, {message: CreateOfferValidationMessage.photos.maxArrayLength})
  public photos?: string[];

  @IsOptional()
  public isPremium?: boolean;

  @IsOptional()
  @Min(Rating.MIN, {message: CreateOfferValidationMessage.rating.minValue})
  @Max(Rating.MAX, {message: CreateOfferValidationMessage.rating.maxValue})
  public rating?: number;

  @IsOptional()
  @IsEnum(EHousingType, { message: CreateOfferValidationMessage.housingType.invalid})
  public housingType?: string;

  @IsOptional()
  @Min(Rooms.MIN, {message: CreateOfferValidationMessage.rooms.minValue})
  @Max(Rooms.MAX, {message: CreateOfferValidationMessage.rooms.maxValue})
  public rooms?: number;

  @IsOptional()
  @Min(Adults.MIN, {message: CreateOfferValidationMessage.adults.minValue})
  @Max(Adults.MAX, {message: CreateOfferValidationMessage.adults.maxValue})
  public adults?: number;

  @IsOptional()
  @Min(Price.MIN, {message: CreateOfferValidationMessage.price.minValue})
  @Max(Price.MAX, {message: CreateOfferValidationMessage.price.maxValue})
  public price?: number;

  @IsOptional()
  @IsArray({message: CreateOfferValidationMessage.conveniences.invalidFormat})
  @IsEnum(EConvinience, { each: true, message: CreateOfferValidationMessage.conveniences.invalid })
  public conveniences?: string[];

  @IsOptional()
  @IsMongoId({ message: CreateOfferValidationMessage.authorID.invalidId })
  public authorID?: string;

  @IsOptional()
  @IsInt({ message: CreateOfferValidationMessage.commentsCount.invalidFormat })
  public commentsCount?: number;
}
