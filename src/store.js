import { configureStore, createSlice } from '@reduxjs/toolkit'

const playedGamesSlice = createSlice({
  name: 'playedGames',
  initialState: [],
  reducers: {
    addGame(state, action) {
      state.push(action.payload)
    },
    setGames(state, action) {
      return action.payload
    },
    updateGame(state, action) {
      const newGame = action.payload
      const updatedState = state.map(game => 
        game._id === newGame._id ? newGame : game
      )
      return updatedState
    },
    removeGame(state, action) {
      return state.filter(game => game._id !== action.payload._id)
    }
  }
})

export const store = configureStore({
  reducer: {
    playedGames: playedGamesSlice.reducer
  }
})