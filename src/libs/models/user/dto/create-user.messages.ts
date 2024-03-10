import { PasswordLength, UserNameLength } from '../../../../const.js';
import { EUserKind } from '../../../../types/user-kind-enam.js';

export const UserValidationMessage = {
  name: {
    invalidFormat: 'Name must be a string',
    lengthField: `min length is ${UserNameLength.MIN}, max is ${UserNameLength.MAX}`,
  },

  avatar: {
    invalidFormat: 'Avatar must be a string',
  },

  email: {
    invalidFormat: 'email must be a valid address'
  },

  userKind: {
    invalid: `User can be kind of: ${EUserKind.USUAL}, ${EUserKind.PRO}`,
  },

  password: {
    invalidFormat: 'Password must be a string',
    lengthField: `min length is ${PasswordLength.MIN}, max is ${PasswordLength.MAX}`,
  },

  favoritesOffers: {
    invalidFormat: 'FavoritesOffers field must be an array',
    invalidId: 'favoritesOffers field must be an array of valid id',
  },
};
