import React, { useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import * as routes from "../../routes";

import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { OverlayPanel } from "primereact/overlaypanel";
import Score from "./score";
import Status from "./status";

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
          style={{ width: "100px" }}
          className="overlaypanel"
        >
          <div className="edit-button" onClick={editEvent}>
            <i className="pi pi-pencil"></i>
            Edit
          </div>
        </OverlayPanel>
      </Card>
    </div>
  );
};

export default GameBox;
