import { readFileSync } from 'node:fs';
import { FileReader } from './file-reader.interface.js';
import { IOffer, ECity, EConvinience, EHousingType } from '../../types/index.js';
import { toBoolean } from '../../util.js';

export class TSVFileReader implements FileReader {
  private rawData = '';

  constructor(
    private readonly filename: string
  ) {}

  public read(): void {
    this.rawData = readFileSync(this.filename, { encoding: 'utf-8' });
  }

  public toArray(): IOffer[] {
    if (!this.rawData) {
      throw new Error('File was not read');
    }

    return this.rawData
      .split('\n')
      .filter((row) => row.trim().length > 0)
      .map((line) => line.split('\t'))
      .map(([name, description, createdDate, city, previewImg, photos, isPremium, isFavorites, rating, housingType, rooms, adults, price, conveniences, author, commentsCount]) => ({
        name,
        description,
        date: new Date(createdDate),
        city: city as ECity,
        previewImg,
        photos: photos.split(';'),
        isPremium: toBoolean(isPremium),
        isFavorites: toBoolean(isFavorites),
        rating: Number.parseInt(rating, 10),
        housingType: housingType as EHousingType,
        rooms: Number.parseInt(rooms, 10),
        adults: Number.parseInt(adults,10),
        price: Number.parseInt(price, 10),
        conveniences: conveniences.split(';')
          .map((conv) => EConvinience[conv as 'BREAKFAST' | 'AIRCONDITIONING' | 'LAPTOPWORKSPACE' | 'BABYSEAT' | 'WASHER' | 'TOWELS' | 'FRIDGE']),
        author,
        commentsCount: Number.parseInt(commentsCount, 10),
      }));
  }
}
