export class CreateOfferDto {
  public title: string;
  public description: string;
  public date: string;
  public city: string;
  public previewImg: string;
  public photos: string[];
  public isPremium: boolean;
  public rating: number;
  public housingType: string;
  public rooms: number;
  public adults: number;
  public price: number;
  public conveniences: string[];
  public authorID: string;
  public commentsCount: number;
}
