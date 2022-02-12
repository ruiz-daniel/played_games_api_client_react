/* eslint-disable eqeqeq */
import React, { useState, useEffect } from "react";
import api from "../../services/APICalls";
import GameBox from "../utils/GameBox";
import { InputText } from "primereact/inputtext";
import { ScrollPanel } from "primereact/scrollpanel";
import { ScrollTop } from "primereact/scrolltop";

var filters = {
  name: "",
  dev: "",
  publisher: "",
  year: "",
  rating: "",
  genre: "",
  platform: "",
  status: "",
};

var gamesBackup = [];

const PlayedGamesList = () => {
  const [games, setGames] = useState([]);
  const [filtering, setFiltering] = useState(false);

  const cleanFilters = () => {
    filters = {
      name: "",
      dev: "",
      publisher: "",
      year: "",
      rating: "",
      genre: "",
      platform: "",
      status: "",
    };
  };

  const compareIgnoreCase = (stringA, stringB) => {
    return stringA.toUpperCase().includes(stringB.toUpperCase());
  };

  useEffect(() => {
    cleanFilters();
    api.getPlayedGames((data) => {
      setGames(data);
      gamesBackup = data;
    });
  }, []);

  useEffect(() => {
    var filtered = [];

    gamesBackup.forEach((game) => {
      if (
        compareIgnoreCase(game.name, filters.name) &&
        compareIgnoreCase(game.developer, filters.dev) &&
        compareIgnoreCase(game.publisher, filters.publisher) &&
        game.year.includes(filters.year) &&
        compareIgnoreCase(game.genre, filters.genre) &&
        (filters.rating == "" || game.rating == filters.rating) &&
        compareIgnoreCase(game.platform.name, filters.platform) &&
        compareIgnoreCase(game.status.name, filters.status)
      ) {
        filtered.push(game);
      }
    });
    setGames(filtered);
    setFiltering(false);
  }, [filtering]);

  const filterName = (name) => {
    filters.name = name;
    setFiltering(true);
  };

  const filterDev = (dev) => {
    filters.dev = dev;
    setFiltering(true);
  };

  const filterPublisher = (publisher) => {
    filters.publisher = publisher;
    setFiltering(true);
  };

  const filterGenre = (genre) => {
    filters.genre = genre;
    setFiltering(true);
  };

  const filterYear = (year) => {
    filters.year = year;
    setFiltering(true);
  };

  const filterRating = (rating) => {
    filters.rating = rating;
    setFiltering(true);
  };

  const filterPlatform = (platform) => {
    filters.platform = platform;
    setFiltering(true);
  };

  const filterStatus = (status) => {
    filters.status = status;
    setFiltering(true);
  };

  return (
    <div className="played-games-list">
      <h3 className="games-quantity-text">Showing: {games.length}</h3>
      <div className="filters-container flex justify-content-between">
        <InputText
          id="fname"
          placeholder="Name"
          className="p-inputtext-sm"
          onChange={(e) => filterName(e.target.value)}
        />
        <InputText
          id="fdev"
          placeholder="Developer"
          className="p-inputtext-sm"
          onChange={(e) => filterDev(e.target.value)}
        />
        <InputText
          id="fpub"
          placeholder="Publisher"
          className="p-inputtext-sm"
          onChange={(e) => filterPublisher(e.target.value)}
        />
        <InputText
          id="fyear"
          placeholder="Year"
          className="p-inputtext-sm"
          onChange={(e) => filterYear(e.target.value)}
        />
        <InputText
          id="fgenre"
          placeholder="Genre"
          className="p-inputtext-sm"
          onChange={(e) => filterGenre(e.target.value)}
        />
        <InputText
          id="fplatform"
          placeholder="Platform"
          className="p-inputtext-sm"
          onChange={(e) => filterPlatform(e.target.value)}
        />
        <InputText
          id="fstatus"
          placeholder="Status"
          className="p-inputtext-sm"
          onChange={(e) => filterStatus(e.target.value)}
        />
        <InputText
          id="frating"
          placeholder="Rating"
          className="p-inputtext-sm"
          onChange={(e) => filterRating(e.target.value)}
        />
      </div>
      <ScrollPanel style={{ width: "100%", height: "87vh" }}>
        <div className="games-container flex flex-wrap justify-content-between">
          {games.map((game) => {
            return (
              <GameBox
                key={game.id}
                game={game}
                reload={() => {
                  cleanFilters();
                  api.getPlayedGames((data) => {
                    setGames(data);
                    gamesBackup = data;
                  });
                }}
              ></GameBox>
            );
          })}
        </div>
        <ScrollTop
          target="parent"
          threshold={100}
          className="custom-scrolltop"
          icon="pi pi-arrow-up"
        />
      </ScrollPanel>
    </div>
  );
};

export default PlayedGamesList;
