import React from "react";
import { PlayedGame } from "@/models/PlayedGame";
import GameBox from "../cards/GameBox";
import { UploadGameData } from "@/models/types";

type GamesListProps = {
  games: Array<PlayedGame>;
  updateGame?: (game: UploadGameData) => void;
  removeGame?: (gameId: string) => void;
};

function GamesList({ games, updateGame, removeGame }: GamesListProps) {
  return (
    <div className="flex flex-wrap justify-center md:justify-content-between gap-y-6 gap-x-10 pb-10">
      {games &&
        games.map((game) => (
          <GameBox
            key={game._id}
            game={game}
            updateGame={updateGame}
            removeGame={removeGame}
            mode="wide"
          />
        ))}
    </div>
  );
}

export default GamesList;
