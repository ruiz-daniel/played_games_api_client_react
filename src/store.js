import { configureStore, createSlice } from '@reduxjs/toolkit'

const playedGamesSlice = createSlice({
  name: 'playedGames',
  initialState: [],
  reducers: {
    addGame(state, action) {
      state.push(action.payload)
    },
    removeAction(state, action) {}
  }
})

export const store = configureStore({
  reducer: {
    playedGames: playedGamesSlice.reducer
  }
})