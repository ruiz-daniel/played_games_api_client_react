import { useContext } from "react";
import { PlayedGamesContext } from "../contexts/playedGames";

export function usePlayedGamesContext() {
  const context = useContext(PlayedGamesContext)
  if (!context) {
    throw new Error('Played Games context is missing the provider and cannot be accessed')
  }
  return context
}