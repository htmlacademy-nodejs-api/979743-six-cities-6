import { Adults, OfferDescriptionLength, OfferTitleLength, PHOTOS_COUNT, Price, Rating, Rooms } from '../../../../const.js';

export const CreateOfferValidationMessage = {
  title: {
    minLength: `Minimum title length must be ${OfferTitleLength.MIN}`,
    maxLength: `Maximum title length must be ${OfferTitleLength.MAX}`,
  },

  description: {
    minLength: `Minimum description length must be ${OfferDescriptionLength.MIN}`,
    maxLength: `Maximum description length must be ${OfferDescriptionLength.MAX}`,
  },

  postDate: {
    invalidFormat: 'postDate must be a valid ISO date',
  },

  city: {
    invalid: 'City must be one of the 6: Paris, Cologne, Brussels, Amsterdam, Hamburg, Dusseldorf', //TODO шабл строка, переменные перечисления
  },

  photos: {
    invalidFormat: 'Field photos must be an array',
    minArrayLength: `Photos array length should be ${PHOTOS_COUNT}`,
    maxArrayLength: `Photos array length should be ${PHOTOS_COUNT}`
  },

  price: {
    minValue: `Minimum price is ${Price.MIN}`,
    maxValue: `Maximum price is ${Price.MAX}`,
  },

  rating: {
    minValue: `Minimum rating is ${Rating.MIN}`,
    maxValue: `Maximum rating is ${Rating.MAX}`,
  },

  housingType: {
    invalid: 'HousingType must be one of the 4: apartment, house, room, hotel',
  },

  rooms: {
    minValue: `Minimum rooms is ${Rooms.MIN}`,
    maxValue: `Maximum rooms is ${Rooms.MAX}`,
  },

  adults: {
    minValue: `Minimum adults is ${Adults.MIN}`,
    maxValue: `Maximum adults is ${Adults.MAX}`,
  },

  conveniences: {
    invalid: 'Conveniences must be one or more of the: Breakfast, Air conditioning, Laptop friendly workspace, Baby seat, Washer, Towels, Fridge',
    invalidFormat: 'Field conveniences must be an array'
  },

  authorID: {
    invalidId: 'AuthorID field must be an array of valid id',
  },

  commentsCount: {
    invalidFormat: 'CommentsCount must be an integer',
  },
} as const;
