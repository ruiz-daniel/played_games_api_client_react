import React, { useRef } from "react";
import { useHistory } from "react-router-dom";
import * as routes from "../../routes";

import { Card } from "primereact/card";
import { OverlayPanel } from "primereact/overlaypanel";
import { confirmDialog } from "primereact/confirmdialog";
import Score from "./score";
import Status from "./status";
import api from "../../services/APICalls";

const GameBox = (props) => {
  const history = useHistory();
  const op = useRef(null);
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

  const header = (
    <img
      alt="Game Cover"
      src={
        props.game.image || "https://localhost:5001/game_images/no-cover.jpg"
      }
      onError={(e) =>
        (e.target.src =
          "https://localhost:5001/game_images/no-cover.jpg" || props.game.image)
      }
    />
  );
  return (
    <div>
      <Card title={props.game.name} style={{ width: "25em" }} header={header}>
        <div className="gamebox-details">
          Developed by: {props.game.developer}
          <br />
          Published by: {props.game.publisher}
          <br />
          Year: {props.game.year}
          <br />
          Genre: {props.game.genre}
          <br />
          Platform: {props.game.platform.name}
        </div>
        <div className="gamebox-footer">
          <div className="gamebox-footer-status">
            <Status status={props.game.status.name}></Status> Score:{" "}
            <Score className="score" score={props.game.rating}></Score>
          </div>
          <span
            className="pi pi-bars box-menu"
            onClick={(e) => op.current.toggle(e)}
          ></span>
        </div>
        <OverlayPanel
          ref={op}
          style={{ width: "120px" }}
          className="overlaypanel"
        >
          <div className="edit-button" onClick={editEvent}>
            <i className="pi pi-pencil"></i>
            Edit
          </div>
          <div className="delete-button" onClick={confirm}>
            <i className="pi pi-trash"></i>
            Delete
          </div>
        </OverlayPanel>
      </Card>
    </div>
  );
};

export default GameBox;
