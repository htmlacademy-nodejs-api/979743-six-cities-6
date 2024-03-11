import { Expose } from 'class-transformer';
import { EUserKind } from '../../../../types/user-kind-enam.js';

export class UserRdo {
  @Expose()
  public id: string;

  @Expose()
  public name: string ;

  @Expose()
  public email: string ;

  @Expose()
  public avatar: string;

  @Expose()
  public userKind: EUserKind;

  @Expose()
  public favoritesOffers: string[];
}
