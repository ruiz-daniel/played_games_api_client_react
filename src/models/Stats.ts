export type PlayedGamesStats = {
  totalGames: number,
  completionDatasets: {
    "Completed": number,
    "Dropped": number,
    "N/A": number,
    "On Hold": number,
    "Online": number,
    "Plan to Play": number,
    "Playing": number,
    "Replaying": number
  },
  platformDatasets: {
    [key: string]: number
  }
  developerDataset: {
    [key: string]: number
  },
  publisherDataset: {
    [key: string]: number
  },
  playedYearDatasets: {
    [key: string]: number
  },
  genreDatasets: {
    [key: string]: number
  },
  scoreDatasets: {
    [key: string]: number
  },
  yearDatasets: {
    [key: string]: number
  }
}