import { createSlice } from "@reduxjs/toolkit";

const playedGamesSlice = createSlice({
  name: "playedGames",
  initialState: {
    games: [],
    page: 1,
    max: null,
  },
  reducers: {
    addGame(state, action) {
      state.games.push(action.payload);
      state.max++;
    },
    setGames(state, action) {
      return action.payload;
    },
    updateGame(state, action) {
      const newGame = action.payload;
      const updatedList = state.games.map((game) =>
        game._id === newGame._id ? newGame : game
      );
      return {
        ...state,
        games: updatedList,
      };
    },
    removeGame(state, action) {
      return {
        ...state,
        games: state.games.filter((game) => game._id !== action.payload._id),
        max: state.max - 1,
      };
    },
  },
});

export const { addGame, setGames, updateGame, removeGame } = playedGamesSlice.actions
export const playedGamesReducer = playedGamesSlice.reducer