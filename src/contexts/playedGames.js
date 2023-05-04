/* eslint-disable eqeqeq */
import { useState, useEffect, createContext } from 'react'
import api from '../services/IApi'
import { useMessages } from '../hooks/useMessages'
import { useUser } from '../hooks/useUser'

export const PlayedGamesContext = createContext()

let gamesBackup = []
// Keep the filtered games when component unmounts
let filteringGames = []

export function PlayedGamesProvider({ children }) {
  const [games, setGames] = useState([])
  const { user } = useUser()

  const { message } = useMessages()

  const resetFilter = () => {
    filteringGames = []
    setGames(gamesBackup)
  }

  const onFilter = (games) => {
    filteringGames = games
    setGames(games)
  }

  function getGames(callback) {
    api.PlayedGamesApi.getPlayedGames(
      localStorage.getItem('userid'),
      (response) => {
        if (filteringGames.length) {
          setGames(filteringGames)
        } else {
          setGames(response.data)
        }
        gamesBackup = response.data
      },
      (error) => {
        console.log(
          '🚀 ~ file: PlayedGamesList.js ~ line 56 ~ useEffect ~ error',
          error,
        )
        message('error', error.message)
      }
    )
  }

  const localFilter = (value) => {
    const filtered = []
    gamesBackup.forEach((game) => {
      let found = false
      Object.keys(game).forEach((key) => {
        if (!['played_hours', 'id', '_id'].includes(key)) {
          if (['completion', 'platform'].includes(key)) {
            if (game[key].name == value) {
              found = true
            }
          } else if (typeof game[key] === 'string') {
            if (game[key].includes(value)) {
              found = true
            }
          } else if (game[key].length) {
            // Array
            if (game[key].toString().includes(value)) {
              console.log(key)
              found = true
            }
          } else {
            if (game[key] == value) {
              found = true
            }
          }
        }
      })
      if (found) {
        filtered.push(game)
      }
    })
    filteringGames = filtered
    setGames(filtered)
  }

  const uploadGame = (game, callback) => {
    api.PlayedGamesApi.postPlayedGame(game, (response) => {
      message('info', "Game Uploaded Successfully")
      const updatedGames = [...games, response.data]
      setGames(updatedGames)
      gamesBackup = updatedGames
      callback && callback()
    })
  }

  const updateGame = (game, callback) => {
    api.PlayedGamesApi.patchPlayedGame(game, (response) => {
      message('info', "Game Updated Successfully")
      const updatedGames = games.map((game) => 
        game._id === response.data._id ? response.data : game
      )
      setGames(updatedGames)
      gamesBackup = updatedGames
      callback && callback()
    })
  }

  const getGame = (id) => {
    return games.find(game => game._id === id)
  }

  const removeGame = (id, callback) => {
    api.PlayedGamesApi.deletePlayedGame(id, (response) => {
      message('info', "Game Deleted Successfully")
      const updatedGames = games.filter(game => game._id !== id)
      setGames(updatedGames)
      gamesBackup = updatedGames
      callback && callback()
    })
  }

  useEffect(() => {
    const userid = user?._id
    userid ? getGames() : setGames([])
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  const sharedContent = {
    games,
    getGames,
    localFilter,
    resetFilter,
    onFilter,
    gamesBackup,
    uploadGame,
    updateGame,
    getGame,
    removeGame
  }

  return (
    <PlayedGamesContext.Provider value={sharedContent}>
      {children}
    </PlayedGamesContext.Provider>
  )
}