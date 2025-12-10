import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import type { PlayedGame } from "../../models/PlayedGame";

type PlayedGamesSliceType = {
  games: PlayedGame[],
  page: number,
  max: number
}

const initialState: PlayedGamesSliceType = {
    games: [],
    page: 1,
    max: 0,
  }

const playedGamesSlice = createSlice({
  name: "playedGames",
  initialState,
  reducers: {
    addGame(state, action: PayloadAction<PlayedGame>) {
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
export const storedGames = (state: RootState) => state.playedGames.games
export const playedGamesReducer = playedGamesSlice.reducer