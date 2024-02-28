import { defaultClasses, getModelForClass, prop, modelOptions } from '@typegoose/typegoose';
import { EUserKind, TUser } from '../../../types/index.js';
import { createSHA256 } from '../../../helpers/index.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface UserEntity extends defaultClasses.Base {}

modelOptions({
  schemaOptions: {
    collection: 'users',
    timestamps: true,
  }
});

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class UserEntity extends defaultClasses.TimeStamps implements TUser {
  constructor(userData: TUser) {
    super();
    this.userID = userData.userID;
    this.name = userData.name;
    this.email = userData.email;
    this.avatar = userData.avatar;
    this.userKind = userData.userKind;
  }

  @prop({ required: true })
  public userID: string;

  @prop({ required: true })
  public name: string;

  @prop({
    required: true,
    math: [/^([\w-\\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'Email is incorrect'],
    unique: true,
  })
  public email: string;

  @prop({
    required: false,
    // match: [([/^\s]+(?=\.(jpg|png))\.\2), 'File extention is incorrect'], // TODO
    default: '',
  })
  public avatar?: string;

  @prop({ required: true, })
  private password?: string;

  public setPassword(password: string, salt: string) {
    this.password = createSHA256(password, salt);
  }

  public getPassword() {
    return this.password;
  }

  @prop({ required: true, })
  public userKind: EUserKind;
}

export const UserModel = getModelForClass(UserEntity);
