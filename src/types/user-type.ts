import { USER_TYPES } from '../consts.js';

export type TUser = {
  name: string;
  email: string;
  avatar?: string;
  password: string;
  userType: typeof USER_TYPES;
}

