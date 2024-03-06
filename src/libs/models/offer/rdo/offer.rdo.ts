import { Expose, Type } from 'class-transformer';
import { UserRdo } from '../../user/rdo/user.rdo.js';

export class OfferRdo {
  @Expose()
  public id: string;

  @Expose()
  public title: string;

  @Expose()
  public city: string;

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

  @Expose()
  public rating: string;

  @Expose()
  public housingType: string;

  @Expose()
  public price: string;

  @Expose({ name: 'authorID'})
  @Type(() => UserRdo)
  public author: UserRdo;

  @Expose()
  public commentsCount: string;
}
