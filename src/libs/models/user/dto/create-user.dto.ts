// import { EUserKind } from '../../../../types/index.js';

export class CreateUserDto {
  public userID: string;
  public name: string;
  public email: string;
  public avatar?: string;
  public isPro: boolean;
  public password: string;
}
