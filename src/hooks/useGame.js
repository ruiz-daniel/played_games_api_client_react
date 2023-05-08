/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import { usePlayedGames } from './usePlayedGames'

export function useGame(gameid) {
  const [game, setGame] = useState()
  const { getGame, updateGame, removeGame, handleImages } = usePlayedGames()

  const update = (data, callback) => {
    data._id = gameid
    updateGame(data, callback)
  }

  const remove = (callback) => {
    removeGame(gameid, callback)
  }

  const updateImages = async (data) => {
    await handleImages(data, game)
    update(game)
  }

  useEffect(() => {
    setGame(getGame(gameid))
  })

  return { game, update, remove, updateImages }
}
