import { FileReader } from './file-reader.interface.js';
import { readFileSync } from 'node:fs';
import { TOffer, TCity, TUser, TComment } from '../../types/index.js';
import { CITIES } from '../../consts.js';

export class TSVFileReader implements FileReader {
  private rawData = ''; // вся информация из файла

  constructor(
    private readonly filename: string // путь к файлу
  ) {}

  public read(): void {
    this.rawData = readFileSync(this.filename, { encoding: 'utf-8' });
  }

  public toArray(): TOffer[] {
    if (!this.rawData) {
      throw new Error('File was not read');
    }

    return this.rawData
      .split('\n') // возвращает массив строк
      .filter((row) => row.trim().length > 0) // тримим последнюю пустую строку
      .map((line) => line.split('\t')) //
      .map(([name, description, createdDate, city, previewImg, photos, isPremium, isFavorites, rating, housingType, rooms, adults, price, conveniences, author, commentsCount]) => ({
        name,
        description,
        date: new Date(createdDate),
        // city: CITIES.filter((ccity) => ccity.name === city),
        city: CITIES[type as 'Paris' | 'Cologne' | 'Brussels' | 'Amsterdam' | 'Hamburg' | 'Dusseldorf'],
        previewImg,
        photos: photos.split(';'), // массив фотографий
        isPremium,
        isFavorites,
        rating: Number.parseInt(rating, 10),
        housingType,
        rooms: Number.parseInt(rooms, 10),
        adults: Number.parseInt(adults,10),
        price: Number.parseInt(price, 10),
        conveniences: conveniences.split(';'),
        author,
        commentsCount: Number.parseInt(commentsCount, 10),
      }));
  }
}
