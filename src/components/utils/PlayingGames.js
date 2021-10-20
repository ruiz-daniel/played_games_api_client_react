/* eslint-disable eqeqeq */
import React, { useState, useEffect } from "react";
import api from "../../services/APICalls";
import { useHistory } from "react-router";

import { Carousel } from "primereact/carousel";

import Score from "./score";
import Status from "./status";
import * as routes from "../../routes";

const PlayingGames = () => {
  const history = useHistory();
  const [games, setGames] = useState([]);

  useEffect(() => {
    api.getPlayingGames((data) => {
      setGames(data);
    });
  }, []);

  const editEvent = (game) => {
    history.push({
      pathname: routes.editgame,
      state: {
        // location state
        game: game,
      },
    });
  };

  const responsiveOptions = [
    {
      breakpoint: "1024px",
      numVisible: 1,
      numScroll: 1,
    },
    {
      breakpoint: "600px",
      numVisible: 1,
      numScroll: 1,
    },
    {
      breakpoint: "480px",
      numVisible: 1,
      numScroll: 1,
    },
  ];

  const template = (game) => {
    return (
      <div className="content p-grid">
        <div className="details p-col-6">
          {game.status.id == 3 && (
            <h1 className="status_tittle">Playing Right Now</h1>
          )}
          {game.status.id == 4 && (
            <h1 className="status_tittle">Will Continue Eventually</h1>
          )}
          {game.status.id == 6 && <h1 className="status_tittle">Replaying</h1>}
          <h2>{game.name}</h2>
          <h2>Current Score:</h2>
          <h2>
            <Score score={game.rating}></Score>
          </h2>
          {game.status.name === "Replaying" && (
            <h2>
              <Status status={game.status.name}></Status>
            </h2>
          )}
        </div>
        <div className="p-col-6">
          <img
            src={game.image}
            alt="Game Cover"
            onClick={() => {
              editEvent(game);
            }}
          ></img>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="playing-carrousel">
        <Carousel
          value={games}
          numVisible={1}
          numScroll={1}
          responsiveOptions={responsiveOptions}
          className="custom-carousel"
          circular
          autoplayInterval={3000}
          itemTemplate={template}
        />
      </div>
    </div>
  );
};

export default PlayingGames;
