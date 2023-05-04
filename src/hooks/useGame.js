/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import { usePlayedGames } from './usePlayedGames'
import GeneralApi from '../services/GeneralApi'

export function useGame(gameid) {
  const [game, setGame] = useState()
  const { getGame, updateGame, removeGame } = usePlayedGames()

  const update = (data, callback) => {
    data._id = gameid
    updateGame(data, callback)
  }

  const remove = (callback) => {
    removeGame(gameid, callback)
  }

  const updateImage = async (data) => {
    const imagePath = await GeneralApi.uploadImage(data.files[0])
    update({
      cover: imagePath.data
    })
  }

  useEffect(() => {
    setGame(getGame(gameid))
  })

  return { game, update, remove, updateImage }
}
