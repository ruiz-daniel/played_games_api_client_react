export type IgdbGameData = {
  id: number;
  cover: IgdbGameCover;
  genres: IgdbGameGenre[];
  involved_companies: IgdbGameCompany[];
  name: string;
  release_dates: IgdbReleaseDate[];
  summary: string;
  url: string;
};

export type IgdbGameCover = {
  id: number;
  url: string;
};

export type IgdbGameGenre = {
  id: number;
  name: string;
};

export type IgdbGameCompany = {
  id: number;
  company: {
    id: number;
    name: string;
  };
  developer: boolean;
  publisher: boolean;
};

export type IgdbReleaseDate = {
  id: number;
  human: string;
  m: number;
  platform: IgdbPlatform;
  y: number;
};

export type IgdbPlatform = {
  id: number;
  name: string;
};
