import { configureStore } from '@reduxjs/toolkit'
import { playedGamesReducer, addGame, setGames, removeGame, updateGame } from './slices/playedGames'
import { usersReducer, setUser, removerUser } from './slices/users'

export const store = configureStore({
  reducer: {
    playedGames: playedGamesReducer,
    users: usersReducer
  }
})

export { addGame, setGames, removeGame, updateGame }
export { setUser, removerUser }

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store