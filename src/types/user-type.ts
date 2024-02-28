import { EUserKind } from './user-kind-enam.js';

export type TUser = {
  userID: string;
  name: string;
  email: string;
  avatar?: string;
  userKind: EUserKind;
}
