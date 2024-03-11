import { CommentsLength, Rating } from '../../../../const.js';

export const CommentValidationMessage = {
  text: {
    invalidFormat: 'Name must be a string',
    lengthField: `min length is ${CommentsLength.MIN}, max is ${CommentsLength.MAX}`,
  },

  rating: {
    minValue: `Minimum rating is ${Rating.MIN}`,
    maxValue: `Maximum rating is ${Rating.MAX}`,
  },

  authorID: {
    invalidId: 'AuthorID field must be an array of valid id',
  },

  offerID: {
    invalidId: 'OfferID field must be an array of valid id',
  },
};
