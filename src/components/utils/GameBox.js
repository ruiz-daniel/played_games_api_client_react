import React from "react";
import { useHistory } from "react-router-dom";
import * as routes from "../../routes";

import Score from "./score";
import Status from "./status";

const GameBox = (props) => {
  const history = useHistory();
  const editEvent = () => {
    history.push({
      pathname: routes.editgame,
      state: {
        // location state
        game: props.game,
      },
    });
  };

  return (
    <div className="game-box-container">
      <div className="game-box-img" onClick={editEvent}>
        <img
          alt="Game Cover"
          src={
            props.game.image
              ? props.game.image
              : "https://localhost:5001/game_images/no-cover.jpg"
          }
        />
        <div className="game-details-panel">
          <div className="details-icon">
            <span className="pi pi-eye"></span>
          </div>
        </div>
        <Status status={props.game.status.name}></Status>
        <Score score={props.game.rating}></Score>
      </div>

      <p>{props.game.name}</p>
    </div>
  );
};

export default GameBox;
