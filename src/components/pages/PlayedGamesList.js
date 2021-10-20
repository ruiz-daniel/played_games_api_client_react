/* eslint-disable eqeqeq */
import React, { useState, useEffect } from "react";
import api from "../../services/APICalls";
import GameBox from "../utils/GameBox";
import PlayingGames from "../utils/PlayingGames";
import { Accordion, AccordionTab } from "primereact/accordion";
import { InputText } from "primereact/inputtext";
import { ScrollPanel } from "primereact/scrollpanel";
import { OverlayPanel } from "primereact/overlaypanel";

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

  // const getAvgScore = (data) => {
  //   let accumulate = 0;
  //   data.forEach((element) => {
  //     accumulate += element.rating;
  //   });
  //   setAvgScore(accumulate / data.length);
  // };

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
    <div className="playedgames-wrapper">
      <div className="p-grid playedgames-content">
        <div className="p-col-4 played_games_sidebar">
          <PlayingGames></PlayingGames>
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
        </div>
        <div className="p-grid p-col-8 played_games_list">
          <ScrollPanel style={{ width: "100%", height: "90vh" }}>
            <div className="p-grid p-col-12">
              {games.map((game) => {
                return (
                  <div className="p-col-3" key={game.id}>
                    <GameBox
                      game={game}
                      reload={() => {
                        cleanFilters();
                        api.getPlayedGames((data) => {
                          setGames(data);
                          gamesBackup = data;
                        });
                      }}
                    ></GameBox>
                  </div>
                );
              })}
            </div>
          </ScrollPanel>
        </div>
      </div>
    </div>
  );
};

export default PlayedGamesList;
