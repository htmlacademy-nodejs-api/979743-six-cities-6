import { IsArray, IsEmail, IsEnum, IsMongoId, IsOptional, IsString, Length } from 'class-validator';
import { UserValidationMessage } from './create-user.messages.js';
import { EUserKind } from '../../../../types/user-kind-enam.js';
import { PasswordLength, UserNameLength } from '../../../../const.js';
export class CreateUserDto {
  @IsString({message: UserValidationMessage.name.invalidFormat})
  @Length(UserNameLength.MIN, UserNameLength.MAX, {message: UserValidationMessage.name.lengthField})
  public name: string;

  @IsEmail({}, {message: UserValidationMessage.email.invalidFormat})
  public email: string;

  @IsOptional()
  @IsString({message: UserValidationMessage.avatar.invalidFormat})
  public avatar?: string;

  @IsEnum(EUserKind, { message: UserValidationMessage.userKind.invalid })
  public userKind: string;

  @IsString({message: UserValidationMessage.password.invalidFormat})
  @Length(PasswordLength.MIN, PasswordLength.MAX, {message: UserValidationMessage.password.lengthField})
  public password: string;

  @IsArray({message: UserValidationMessage.favoritesOffers.invalidFormat})
  @IsMongoId({each: true, message: UserValidationMessage.favoritesOffers.invalidId})
  public favoritesOffers: string[];
}
