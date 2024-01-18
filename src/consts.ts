export const USER_TYPES = ['usual', 'pro'] as const;

export enum City {
  Paris = 'Paris',
  Cologne = 'Cologne',
  Brussels = 'Brussels',
  Amsterdam = 'Amsterdam',
  Hamburg = 'Hamburg',
  Dusseldorf = 'Dusseldorf'
}


// export const CITIES = [
//   {
//     name: 'Paris',
//     latitude: 48.85661,
//     longitude: 2.351499,
//   },
//   {
//     name: 'Cologne',
//     latitude: 50.938361,
//     longitude: 6.959974,
//   },
//   {
//     name: 'Brussels',
//     latitude: 50.846557,
//     longitude: 4.351697,
//   },
//   {
//     name: 'Amsterdam',
//     latitude: 52.370216,
//     longitude: 4.895168,
//   },
//   {
//     name: 'Hamburg',
//     latitude: 53.550341,
//     longitude: 10.000654,
//   },
//   {
//     name: 'Dusseldorf',
//     latitude: 51.225402,
//     longitude: 6.776314,
//   }
// ] as const;

export enum HousingType {
  Apartment = 'apartment',
  House = 'house',
  Room = 'room',
  Hotel = 'hotel'
}

export enum Convinience {
  Breakfast = 'Breakfast',
  AirConditioning = 'Air conditioning',
  LaptopWorkspace = 'Laptop friendly workspace',
  BabySeat = 'Baby seat',
  Washer = 'Washer',
  Towels = 'Towels',
  Fridge = 'Fridge'
}
