import { Expose } from 'class-transformer';

export class OfferRdo {
  @Expose()
  public _id: string;

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

  @Expose()
  public author: string;

  @Expose()
  public commentsCount: string;
}
