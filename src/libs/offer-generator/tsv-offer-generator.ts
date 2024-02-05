import dayjs from 'dayjs';
import { OfferGenerator } from './offer-generator.interface.js';
import { TMockServerData } from '../../types/index.js';
import { getRandomItem, generateRandomValue } from '../../helpers/common.js';
import { MIN_PRICE, MAX_PRICE, FIRST_WEEK_DAY, LAST_WEEK_DAY, MAX_ROOMS, MAX_ADULTS, MAX_RATING, MAX_COMMENT_COUNT, MAX_PHOTO_NUMBER, PHOTOS_COUNT } from './consts.js';

export class TSVOfferGenerator implements OfferGenerator {
  constructor(private readonly mockData: TMockServerData) {}

  public generate(): string {
    const name = getRandomItem<string>(this.mockData.name);
    const description = getRandomItem<string>(this.mockData.description);
    const createdDate = dayjs()
      .subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day')
      .toISOString();
    const city = getRandomItem<string>(this.mockData.city);
    const previewImg = `${city}-image.jpg`;

    const photos = Array.from(
      { length: PHOTOS_COUNT },
      () => `photo${generateRandomValue(0, MAX_PHOTO_NUMBER)}.jpg`
    ).join(';');
    const isPremium = getRandomItem<string>(['true', 'false']);
    const isFavorites = getRandomItem<string>(['true', 'false']);
    const rating = generateRandomValue(1, MAX_RATING, 1);
    const housingType = getRandomItem<string>(this.mockData.housingType);
    const rooms = generateRandomValue(1, MAX_ROOMS);
    const adults = generateRandomValue(1, MAX_ADULTS);
    const price = generateRandomValue(MIN_PRICE, MAX_PRICE);
    const conveniences = Array.from(
      { length: generateRandomValue(1, this.mockData.conveniences.length) },
      () => this.mockData.conveniences[generateRandomValue(1, this.mockData.conveniences.length - 1)]
    ).join(';');
    const author = getRandomItem<string>(this.mockData.users);
    const commentsCount = generateRandomValue(0, MAX_COMMENT_COUNT);

    return [
      name,
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
      author,
      commentsCount
    ]
      .join('\t');
  }
}
