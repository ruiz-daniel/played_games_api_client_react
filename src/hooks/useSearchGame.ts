import { useEffect, useState } from "react"
import { PlayedGame } from "../models/PlayedGame"
import PlayedGamesApi from "../services/PlayedGamesApi"
import { useErrorHandling } from "./useErrorHandling"


export const useSearchGame = () => {
  const [games, setGames] = useState<PlayedGame[]>([])
  const { handleError } = useErrorHandling()

  const searchByName = async (gameName: string) => {
    const gamesResponse = await PlayedGamesApi.getPlayedGames(1, 500, { name: { $regex: gameName } })
    if ("data" in gamesResponse) {
      setGames(gamesResponse.data.games)
    } else {
      handleError(gamesResponse)
    }
  }

  const getAllGames = async () => {
    const gamesResponse = await PlayedGamesApi.getAllPlayedGames()
    if ("data" in gamesResponse) {
      setGames(gamesResponse.data.games)
    } else {
      handleError(gamesResponse)
    }
  }

  useEffect(() => {
    getAllGames()
  }, [])

  return {
    games,
    searchByName
  }
}