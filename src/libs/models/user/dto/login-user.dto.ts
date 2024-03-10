import { IsEmail, IsString, Length} from 'class-validator';
import { UserValidationMessage } from './create-user.messages.js';
import { PasswordLength } from '../../../../const.js';

export class LoginUserDto {
  @IsEmail({}, {message: UserValidationMessage.email.invalidFormat})
  public email: string;

  @IsString({message: UserValidationMessage.password.invalidFormat})
  @Length(PasswordLength.MIN, PasswordLength.MAX, {message: UserValidationMessage.password.lengthField})
  public password: string;
}
