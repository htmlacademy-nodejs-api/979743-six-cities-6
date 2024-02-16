import { USER_TYPES } from '../../../../consts.js';

export class CreateUserDto {
  public name: string;
  public email: string;
  public avatar: string;
  public userType: typeof USER_TYPES;
  public password: string;
}
