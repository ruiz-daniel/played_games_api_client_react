import { PlayedGame } from "../../../models/PlayedGame";

// @ts-ignore
import no_cover from "../../../images/no-cover.jpg";
import EditGame from "../forms/EditGame";
import { UploadGameData } from "../../../models/types";

export type GameDetailsModalProps = {
  game: PlayedGame;
  handleUpdateGame: (data: UploadGameData) => void;
};

const GameDetailsModal = ({
  game,
  handleUpdateGame,
}: GameDetailsModalProps) => {
  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex flex-col gap-2 relative">
        <img
          alt="Game Cover"
          src={game?.cover || no_cover}
          className={`w-full h-36!`}
        />
      </div>
      <div className="flex flex-col gap-2 relative">
        <EditGame game={game} onSubmit={handleUpdateGame} />
      </div>
    </div>
  );
};

export default GameDetailsModal;
