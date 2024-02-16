import { EUserKind } from './user-kind-enam.js';


export type TUser = {
  name: string;
  email: string;
  avatar?: string;
  // password: string;
  userType: EUserKind;
}
