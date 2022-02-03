import React from "react";
import { useHistory } from "react-router-dom";
import * as routes from "../../routes";

import { confirmDialog } from "primereact/confirmdialog";
import { Image } from "primereact/image";
import Score from "./score";
import Status from "./status";
import api from "../../services/APICalls";

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
  const deleteGame = () => {
    api.deletePlayedGame(props.game, () => {
      if (props.reload) {
        props.reload();
      }
    });
  };

  const confirm = () => {
    confirmDialog({
      message: "Are you sure you want to delete this game?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      accept: () => deleteGame(),
    });
  };

  return (
    <div className="game-box-container">
      <div className="game-box-img">
        <Image
          alt="Game Cover"
          src={
            props.game.image ||
            "https://localhost:5001/game_images/no-cover.jpg"
          }
          onError={(e) =>
            (e.target.src =
              "https://localhost:5001/game_images/no-cover.jpg" ||
              props.game.image)
          }
          preview
        />
        <Status
          className="status gamebox-footer-status"
          status={props.game.status.name}
        ></Status>
        <Score className="score" score={props.game.rating}></Score>
      </div>

      <p>{props.game.name}</p>
    </div>
  );
};

export default GameBox;
