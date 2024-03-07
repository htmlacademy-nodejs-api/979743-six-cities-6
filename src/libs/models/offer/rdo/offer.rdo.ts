import { Expose, Type } from 'class-transformer';
import { UserRdo } from '../../user/rdo/user.rdo.js';
import { ECity } from '../../../../types/city-enam.js';

export class OfferRdo {
  @Expose()
  public id: string;

  @Expose()
  public title: string;

  @Expose()
  public city: ECity;

  @Expose()
  public description: string;

  @Expose()
  public date: string;

  @Expose()
  public previewImg: string;

  @Expose()
  public photos: string[];

  @Expose()
  public isPremium: boolean;

  @Expose()
  public rating: number;

  @Expose()
  public housingType: string;

  @Expose()
  public price: number;

  @Expose({ name: 'authorID'})
  @Type(() => UserRdo)
  public author: UserRdo;

  @Expose()
  public commentsCount: string;
}
