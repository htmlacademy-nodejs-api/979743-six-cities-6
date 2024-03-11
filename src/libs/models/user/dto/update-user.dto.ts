import { EUserKind } from '../../../../types/index.js';

export class UpdateUserDto {
  public name?: string;
  public email?: string;
  public avatar?: string;
  public userKind?: EUserKind;
  public password?: string;
  public favoritesOffers?: string[];
}
