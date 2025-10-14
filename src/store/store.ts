import { configureStore } from '@reduxjs/toolkit'
import { playedGamesReducer, addGame, setGames, removeGame, updateGame } from './slices/playedGames'

export const store = configureStore({
  reducer: {
    playedGames: playedGamesReducer
  }
})

export { addGame, setGames, removeGame, updateGame }

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store