import { IOffer, ECity, EHousingType, EConvinience, EUserKind } from '../types/index.js';
import { toBoolean } from './common.js';
import { SCALE_OF_NOTATION } from './helpers.const.js';

export function createOffer(offerData: string): IOffer {
  const [
    offerID,
    title,
    description,
    createdDate,
    city,
    previewImg,
    photos,
    isPremium,
    isFavorites,
    rating,
    housingType,
    rooms,
    adults,
    price,
    conveniences,
    authorID,
    authorName,
    authorEmail,
    authorPassword,
    authorAvatar,
    authorKind,
    commentsCount
  ] = offerData.replace('\n', '').split('\t');

  return {
    offerID,
    title,
    description,
    date: new Date(createdDate),
    city: city as ECity,
    previewImg,
    photos: photos.split(';'),
    isPremium: toBoolean(isPremium),
    isFavorites: toBoolean(isFavorites),
    rating: Number.parseInt(rating, SCALE_OF_NOTATION),
    housingType: housingType as EHousingType,
    rooms: Number.parseInt(rooms, SCALE_OF_NOTATION),
    adults: Number.parseInt(adults,SCALE_OF_NOTATION),
    price: Number.parseInt(price, SCALE_OF_NOTATION),
    conveniences: conveniences.split(';')
      .map((conv) => EConvinience[conv as 'BREAKFAST' | 'AIRCONDITIONING' | 'LAPTOPWORKSPACE' | 'BABYSEAT' | 'WASHER' | 'TOWELS' | 'FRIDGE']),
    author: {
      userID: authorID,
      name: authorName,
      email: authorEmail,
      password: authorPassword,
      avatar: authorAvatar,
      userKind: authorKind as EUserKind,
      favoritesOffers: [],
    },
    commentsCount: Number.parseInt(commentsCount, 10),
  };
}
