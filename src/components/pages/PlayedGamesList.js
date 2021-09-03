/* eslint-disable eqeqeq */
import React, { useState, useEffect } from "react";
import api from "../../services/APICalls";
import GameBox from "../utils/GameBox";
import PlayingGames from "../utils/PlayingGames";
import { Accordion, AccordionTab } from "primereact/accordion";
import { InputText } from "primereact/inputtext";

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
      <PlayingGames></PlayingGames>
      <div className="playedgames-content">
        <div className="filters">
          <Accordion>
            <AccordionTab header="Filters">
              <div className="filters-content">
                <span className="p-float-label">
                  <InputText
                    id="fname"
                    onChange={(e) => filterName(e.target.value)}
                  />
                  <label htmlFor="fname">Name</label>
                </span>
                <span className="p-float-label">
                  <InputText
                    id="fdev"
                    onChange={(e) => filterDev(e.target.value)}
                  />
                  <label htmlFor="fdev">Developer</label>
                </span>
                <span className="p-float-label">
                  <InputText
                    id="fpub"
                    onChange={(e) => filterPublisher(e.target.value)}
                  />
                  <label htmlFor="fpub">Publisher</label>
                </span>
                <span className="p-float-label">
                  <InputText
                    id="fyear"
                    onChange={(e) => filterYear(e.target.value)}
                  />
                  <label htmlFor="fyear">Year</label>
                </span>
                <span className="p-float-label">
                  <InputText
                    id="fgenre"
                    onChange={(e) => filterGenre(e.target.value)}
                  />
                  <label htmlFor="fgenre">Genre</label>
                </span>
                <span className="p-float-label">
                  <InputText
                    id="fplatform"
                    onChange={(e) => filterPlatform(e.target.value)}
                  />
                  <label htmlFor="fplatform">Platform</label>
                </span>
              </div>
              <div className="filters-content">
                <span className="p-float-label">
                  <InputText
                    id="fstatus"
                    onChange={(e) => filterStatus(e.target.value)}
                  />
                  <label htmlFor="fstatus">Status</label>
                </span>
                <span className="p-float-label">
                  <InputText
                    id="frating"
                    onChange={(e) => filterRating(e.target.value)}
                  />
                  <label htmlFor="frating">Score</label>
                </span>
              </div>
            </AccordionTab>
          </Accordion>
        </div>
        <div className="p-grid">
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
        </div>
      </div>
    </div>
  );
};

export default PlayedGamesList;