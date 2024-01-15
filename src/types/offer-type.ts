import { CITIES, HOUSING_TYPES, CONVENIENCES } from '../consts.js';

export type TOffer = {
  name: string;
  description: string;
  date: string;
  city: typeof CITIES;
  previewImg: string;
  photos: string[];
  isPremium: boolean;
  isFavorites: boolean;
  rating: number;
  housingType: typeof HOUSING_TYPES;
  rooms: number;
  adults: number;
  price: number;
  conveniences: typeof CONVENIENCES;
  author: string;
  commentsCount: number;
}
