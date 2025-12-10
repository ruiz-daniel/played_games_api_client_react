import no_cover from "../../../images/no-cover.jpg";

const SteamGameBox = ({ game, width = 150, imageHeight = 90, onSelect }) => {
  const containerStyles = {
    width,
  };

  return (
    <div className="game-box-container" style={containerStyles}>
      <div className="game-box-img" onClick={e => onSelect(game)}>
        <img
          className="cursor-pointer"
          alt="Game Cover"
          src={game?.imgUrl || no_cover}
          height={imageHeight}
        />
      </div>

      <p>{game.title}</p>
    </div>
  );
};

export default SteamGameBox;
