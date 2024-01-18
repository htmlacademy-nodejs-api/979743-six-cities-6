import { City, HousingType, Convinience } from '../consts.js';

export type TOffer = {
  name: string;
  description: string;
  date: Date;
  city: City;
  previewImg: string;
  photos: string[];
  isPremium: boolean;
  isFavorites: boolean;
  rating: number;
  housingType: HousingType;
  rooms: number;
  adults: number;
  price: number;
  conveniences: Convinience[];
  author: string;
  commentsCount: number;
}
