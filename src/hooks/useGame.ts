/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import { usePlayedGames } from './usePlayedGames'
import { useSearchParams } from 'react-router-dom'
import { PlayedGame } from '../models/PlayedGame'
import { GameImagesObject, UploadGameData } from '../models/types'

export function useGame() {
  let [searchParams] = useSearchParams();
  const gameid = searchParams.get("id")
  
  const [game, setGame] = useState<PlayedGame>()
  const { getGame, updateGame, removeGame, handleImages } = usePlayedGames()

  const handleGetGame = async () => {
    if (gameid) {
      const game = await getGame(gameid)
      game && setGame(game)
    }
  }

  const update = (data: UploadGameData, callback: () => void) => {
    const updatedGame = {...data, _id: gameid}
    updateGame(updatedGame, callback)
  }

  const remove = (callback: () => {}) => {
    if (gameid) {
      removeGame(gameid, callback)
    }
  }

  const updateImages = async (data: GameImagesObject) => {
    if (game) {
      await handleImages(data, game)
      // @ts-ignore
      update(game, () => {})
    }
  }

  useEffect(() => {
    handleGetGame()
  }, [gameid])

  return { game, update, remove, updateImages }
}
