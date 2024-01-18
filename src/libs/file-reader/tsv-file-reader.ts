import { FileReader } from './file-reader.interface.js';
import { readFileSync } from 'node:fs';
import { TOffer } from '../../types/index.js';
import { City, Convinience, HousingType } from '../../consts.js';
import { toBoolean } from '../../util.js';

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
        city: City[city as 'Paris' | 'Cologne' | 'Brussels' | 'Amsterdam' | 'Hamburg' | 'Dusseldorf'],
        previewImg,
        photos: photos.split(';'), // массив фотографий
        isPremium: toBoolean(isPremium),
        isFavorites: toBoolean(isFavorites),
        rating: Number.parseInt(rating, 10),
        housingType: HousingType[housingType as 'Apartment' | 'House' | 'Room' | 'Hotel'],
        rooms: Number.parseInt(rooms, 10),
        adults: Number.parseInt(adults,10),
        price: Number.parseInt(price, 10),
        conveniences: conveniences.split(';')
          .map((conv) => Convinience[conv as 'Breakfast' | 'AirConditioning' | 'LaptopWorkspace' | 'BabySeat' | 'Washer' | 'Towels' | 'Fridge']),
        author,
        commentsCount: Number.parseInt(commentsCount, 10),
      }));
  }
}
