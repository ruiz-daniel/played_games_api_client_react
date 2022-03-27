import React from "react";

import { Image } from "primereact/image";

const CharacterBox = ({ character }) => {
  return (
    <div className="character-box flex">
      <Image alt="Character Art" src={character.image} />
      <div className="character-box-data flex flex-grow-1 flex-column">
        <h2>{character.name}</h2>
        <div className="flex ">
          <p className="character-data-item">Game: </p>
          <p className="character-data-item">{character.game.name}</p>
        </div>
        <div className="flex ">
          <p className="character-data-item">Wikia: </p>
          <p className="character-data-item">
            {" "}
            <a href={character.wikia_url}>{character.wikia_url}</a>{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CharacterBox;
