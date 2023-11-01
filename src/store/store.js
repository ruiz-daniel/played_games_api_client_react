import { configureStore } from '@reduxjs/toolkit'
import { playedGamesReducer, addGame, setGames, removeGame, updateGame } from './slices/playedGames'

export const store = configureStore({
  reducer: {
    playedGames: playedGamesReducer
  }
})

export { addGame, setGames, removeGame, updateGame }