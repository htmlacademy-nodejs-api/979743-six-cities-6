export enum ECity {
  PARIS = 'Paris',
  COLOGNE = 'Cologne',
  BRUSSELS = 'Brussels',
  AMSTERDAM = 'Amsterdam',
  HAMBURG = 'Hamburg',
  DUSSELDORF = 'Dusseldorf'
}

export type TLocation = {
  lat: string;
  lon: string;
}

export type TCityLocation = {
  city: {
    name: ECity;
    location: TLocation;
  }
}

export const CITIES: Record<ECity, TLocation> = {
  [ECity.AMSTERDAM]: {
    lat: '52.370216',
    lon: '4.895168'
  },
  [ECity.PARIS]: {
    lat: '48.85661',
    lon: '2.351499'
  },
  [ECity.COLOGNE]: {
    lat: '50.938361',
    lon: '6.959974'
  },
  [ECity.BRUSSELS]: {
    lat: '50.846557',
    lon: '4.351697'
  },
  [ECity.HAMBURG]: {
    lat: '53.550341',
    lon: '10.000654'
  },
  [ECity.DUSSELDORF]: {
    lat: '51.225402',
    lon: '6.776314'
  },
} as const;
