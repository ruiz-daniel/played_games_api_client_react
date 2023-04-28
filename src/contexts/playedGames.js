import { useState, createContext } from 'react'
import api from '../services/IApi'

export const PlayedGamesContext = createContext()

let gamesBackup = []
// Keep the filtered games when component unmounts
let filteringGames = []

export function PlayedGamesProvider({ children }) {
  const [games, setGames] = useState([])

  function getGames(callback) {
    api.PlayedGamesApi.getPlayedGames(
      localStorage.getItem('userid'),
      (data) => {
        if (filteringGames.length) {
          setGames(filteringGames)
        } else {
          setGames(data)
        }
        gamesBackup = data
      },
      (error) => {
        console.log(
          '🚀 ~ file: PlayedGamesList.js ~ line 56 ~ useEffect ~ error',
          error,
        )
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

  const sharedContent = {
    games,
    getGames,
    localFilter
  }

  return (
    <PlayedGamesContext.Provider value={sharedContent}>
      {children}
    </PlayedGamesContext.Provider>
  )
}