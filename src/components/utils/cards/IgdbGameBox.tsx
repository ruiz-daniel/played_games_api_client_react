import { IgdbGameData } from "../../../models/IgdbGameData";
// @ts-ignore
import no_cover from "../../../images/no-cover.jpg";
import { Chip } from "primereact/chip";
import BaseButton from "../BaseButton";

type IgdbGameBoxProps = {
  game: IgdbGameData;
  onSelect: (game: IgdbGameData) => void;
};

const handleCompanyListing = (list: string[]) => {
  return list.map((element, index) => {
    return `${element}${index === list.length - 1 ? "" : ", "}`;
  });
};

const IgdbGameBox = ({ game, onSelect }: IgdbGameBoxProps) => {
  return (
    <div className="bg-white rounded-md shadow-2xl px-3 py-2">
      <div className="header w-full flex justify-between items-center mb-2">
        <p className="font-bold">{game.name}</p>
      </div>
      <div className="content w-full flex gap-4">
        <div className="">
          <img
            alt="Game Cover"
            src={game?.cover?.url || no_cover}
            className={`w-48 h-40! shadow-2xl rounded`}
          />
        </div>
        <div className="flex flex-col gap-2">
          {game.involved_companies && (
            <p>
              Developed by{" "}
              <span className="font-semibold">
                {handleCompanyListing(
                  game.involved_companies
                    ?.filter((company) => company.developer)
                    .map((company) => company.company.name),
                )}
              </span>
            </p>
          )}
          {game.involved_companies && (
            <p>
              Published by{" "}
              <span className="font-semibold">
                {handleCompanyListing(
                  game.involved_companies
                    ?.filter((company) => company.publisher)
                    .map((company) => company.company.name),
                )}
              </span>
            </p>
          )}
          {game.release_dates && <p>Released in {game.release_dates[0].y}</p>}
        </div>
      </div>
      <div className="footer w-full mt-4">
        <div className="flex gap-2 flex-wrap">
          {game.genres?.map((g, index) => (
            <Chip
              key={`${game.id}_${index}`}
              className="bg-amber-200! flex items-center justify-center rounded-2xl "
              label={g.name}
            />
          ))}
        </div>
        <div className="flex flex-row-reverse gap-3">
          <BaseButton label={"Add"} iconClassName={"plus"} onClick={onSelect} />
        </div>
      </div>
    </div>
  );
};

export default IgdbGameBox;
