import { Expose, Type } from 'class-transformer';
import { UserRdo } from '../../user/rdo/user.rdo.js';
import { ECity, TLocation } from '../../../../types/index.js';

export class OfferDetailsRdo {
  @Expose()
  public id: string;

  @Expose()
  public title: string;

  @Expose()
  public city: ECity;

  @Expose()
  public cityLocation: TLocation;

  @Expose()
  public description: string;

  @Expose()
  public date: string;

  @Expose()
  public previewImg: string;

  @Expose()
  public photos: string[];

  @Expose()
  public isPremium: string;

  // @Expose()
  // public isFavorites: string; // ????

  @Expose()
  public rating: string;

  @Expose()
  public housingType: string;

  @Expose()
  public rooms: string;

  @Expose()
  public adults: string;

  @Expose()
  public price: string;

  @Expose()
  public conveniences: string[];

  @Expose({ name: 'authorID'})
  @Type(() => UserRdo)
  public author: UserRdo;

  @Expose()
  public commentsCount: string;
}
