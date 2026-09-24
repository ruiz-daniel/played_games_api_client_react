import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import { useEffect, useState } from "react";
import { inputClassNames } from "./FilterForm";
import { useIgdbGames } from "../../../hooks/useIgdbGames";
import BaseButton from "../BaseButton";
import { IgdbGameData } from "../../../models/IgdbGameData";
import IgdbGameBox from "../cards/IgdbGameBox";
import { Checkbox } from "primereact/checkbox";

type IgdbSearchProps = {
  onSelect: (game: IgdbGameData) => void;
};

const IgdbSearch = ({ onSelect }: IgdbSearchProps) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [exact, setExact] = useState(false);
  const { getCredentials, handleSearch, getGameCoverImg, results, error } =
    useIgdbGames();

  const searchGame = () => {
    handleSearch(searchTerm, exact);
  };

  const handleSelectGame = (game: IgdbGameData) => {
    onSelect(game);
  };

  const handleEnterKeySearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      searchGame();
    }
  };

  useEffect(() => {
    const igdbToken = localStorage.getItem("igdbToken");
    if (!igdbToken) getCredentials();
  }, []);

  return (
    <div className="flex flex-col gap-3 items-center py-4 w-full">
      <InputText
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleEnterKeySearch}
        className={classNames(inputClassNames, "w-[80%]")}
        placeholder="Search your game"
      />
      <div className="flex gap-2 items-center">
        <Checkbox
          checked={exact}
          onClick={(e) => setExact(!exact)}
          pt={{
            box: {
              className: "absolute",
            },
          }}
        />
        <label
          className="ml-2 cursor-pointer font-bold"
          onClick={() => setExact(!exact)}
        >
          Exact Match
        </label>
      </div>
      <BaseButton
        iconClassName={"search"}
        onClick={searchGame}
        label={"Search"}
        disabled={!searchTerm}
      />
      {results.length > 0 && (
        <div className="w-full px-12 flex flex-wrap justify-center items-baseline gap-5 h-[50vh] overflow-y-auto">
          {results.map((game) => (
            <IgdbGameBox
              key={game.id}
              game={game}
              onSelect={() => handleSelectGame(game)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default IgdbSearch;
