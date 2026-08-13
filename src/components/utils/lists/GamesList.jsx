import { ScrollPanel } from "primereact/scrollpanel";
import { ScrollTop } from "primereact/scrolltop";
import GameBox from "../cards/GameBox";

function GamesList({ games, updateGame, removeGame }) {
  return (
    <div className="flex flex-wrap justify-center md:justify-content-between gap-y-6 gap-x-10">
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
