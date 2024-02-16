import { ECity, EHousingType, EConvinience } from '../../../../types/index.js';

export class CreateOfferDto {
  public title: string;
  public description: string;
  public date: Date;
  public city: ECity;
  public previewImg: string;
  public photos: string[];
  public isPremium: boolean;
  public isFavorites: boolean;
  public rating: number;
  public housingType: EHousingType;
  public rooms: number;
  public adults: number;
  public price: number;
  public conveniences: EConvinience[];
  public authorID: string;
  public commentsCount: number;
}
