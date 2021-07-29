/* eslint-disable eqeqeq */
import React, { useState, useEffect } from "react";
import api from "../../services/APICalls";

import { Carousel } from "primereact/carousel";

import Score from "./score";
import Status from "./status";

const PlayingGames = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    api.getPlayingGames((data) => {
      setGames(data);
    });
  }, []);

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
        <div className="details p-col-4">
          <h1>Playing Right Now</h1>
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
        <div className="p-col-8">
          <img src={game.image} alt="Game Cover"></img>
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
