import React, { useState, useEffect } from "react";
import axios from "axios";
import { sr_playedgames } from "../../routes";

const Top10CharacterBox = (props) => {
  const [game, setGame] = useState("");

  useEffect(() => {
    axios
      .get(
        `https://localhost:5001/drgapi/${sr_playedgames}${props.character.character.gameid}`
      )
      .then((response) => {
        setGame(response.data.name);
      });
  }, []);

  return (
    <div className="top10characterbox p-d-flex">
      <div>
        <img
          className="top10charactersimg"
          src={props.character.character.image}
          alt={props.character.name}
        ></img>
      </div>

      <div className="p-d-flex-column p-mx-4 top10characterdata">
        <h3 className="top10header">{props.character.name}</h3>
        <h3 className="top10header"> from {game}</h3>
        <br />
        <br />
        <br />
        <br />
        <h5 className="top10header">
          <a
            href={props.character.character.wikia_url}
            target="_blank"
            rel="noreferrer"
          >
            {props.character.character.wikia_url}
          </a>
        </h5>
      </div>
    </div>
  );
};

export default Top10CharacterBox;
