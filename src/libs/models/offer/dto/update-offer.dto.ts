export class UpdateOfferDto {
  public title?: string;
  public description?: string;
  public date?: Date;
  public city?: string;
  public previewImg?: string;
  public photos?: string[];
  public isPremium?: boolean;
  // public isFavorites: boolean;
  public rating?: number;
  public housingType?: string;
  public rooms?: number;
  public adults?: number;
  public price?: number;
  public conveniences?: string[];
  public authorID?: string;
  public commentsCount?: number;
}
