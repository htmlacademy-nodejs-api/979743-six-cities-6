import { ECity } from './city-type.js';
import { EHousingType } from './housing-type.js';
import { EConvinience } from './convinience-type.js';

export interface IOffer {
  name: string;
  description: string;
  date: Date;
  city: ECity;
  previewImg: string;
  photos: string[];
  isPremium: boolean;
  isFavorites: boolean;
  rating: number;
  housingType: EHousingType;
  rooms: number;
  adults: number;
  price: number;
  conveniences: EConvinience[];
  author: string;
  commentsCount: number;
}
