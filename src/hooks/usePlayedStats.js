import { usePlayedGames } from "./usePlayedGames";

export function usePlayedStats() {

  const { games, localFilter, externalFilter } = usePlayedGames()

  return { games, localFilter, externalFilter }
}