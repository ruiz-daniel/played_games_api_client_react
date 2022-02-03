/* eslint-disable eqeqeq */
import React, { useState, useEffect } from "react";
import api from "../../services/APICalls";
import GameBox from "../utils/GameBox";
import { InputText } from "primereact/inputtext";
import { ScrollPanel } from "primereact/scrollpanel";
import { Sidebar } from "primereact/sidebar";

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
  const [filterbar, toggleFilters] = useState(false);

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

  const FilterBar = () => {
    return (
      <Sidebar visible={filterbar} onHide={() => toggleFilters(false)}>
        <div className="p-grid p-shadow-2 filters">
          <div className="p-col-6 p-d-block">
            <h2>Filter by</h2>
            <ScrollPanel style={{ width: "100%", height: "80%" }}>
              <div className="filter_item">
                <InputText
                  id="fname"
                  placeholder="Name"
                  onChange={(e) => filterName(e.target.value)}
                />
              </div>
              <div className="filter_item">
                <InputText
                  id="fdev"
                  placeholder="Developer"
                  onChange={(e) => filterDev(e.target.value)}
                />
              </div>
              <div className="filter_item">
                <InputText
                  id="fpub"
                  placeholder="Publisher"
                  onChange={(e) => filterPublisher(e.target.value)}
                />
              </div>
              <div className="filter_item">
                <InputText
                  id="fyear"
                  placeholder="Year"
                  onChange={(e) => filterYear(e.target.value)}
                />
              </div>
              <div className="filter_item">
                <InputText
                  id="fgenre"
                  placeholder="Genre"
                  onChange={(e) => filterGenre(e.target.value)}
                />
              </div>
              <div className="filter_item">
                <InputText
                  id="fplatform"
                  placeholder="Platform"
                  onChange={(e) => filterPlatform(e.target.value)}
                />
              </div>
              <div className="filter_item">
                <InputText
                  id="fstatus"
                  placeholder="Status"
                  onChange={(e) => filterStatus(e.target.value)}
                />
              </div>
              <div className="filter_item">
                <InputText
                  id="frating"
                  placeholder="Rating"
                  onChange={(e) => filterRating(e.target.value)}
                />
              </div>
            </ScrollPanel>
          </div>
        </div>
      </Sidebar>
    );
  };

  return (
    <div className="played_games_list">
      <ScrollPanel style={{ width: "100%", height: "92vh" }}>
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
      </ScrollPanel>
    </div>
  );
};

export default PlayedGamesList;
