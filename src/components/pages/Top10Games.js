import React, { useState, useEffect } from "react";
import api from "../../services/APICalls";
import GameBox from "../utils/Top10GameBox";
import Position from "../utils/position";
import { ScrollPanel } from "primereact/scrollpanel";
import { useLocation } from "react-router-dom";
import { InputText } from "primereact/inputtext";

var gamesBackup = [];
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

const Top10Games = (props) => {
  const location = useLocation();
  const [games, setGames] = useState([]);
  const [allGames, setAllGames] = useState([]);
  const [orderedGames, setOrder] = useState([]);
  const [top10name, setTop10Name] = useState(location.state.top10name);
  const [movingGame, setMovingGame] = useState(null);
  const [addingGame, setAddingGame] = useState(null);
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
    setAllGames(filtered);
    setFiltering(false);
  }, [filtering]);

  const filterName = (name) => {
    filters.name = name;
    setFiltering(true);
  };

  const addGame = (game, position) => {
    api.postTop10Game({ gameid: game.id, pos: position }, top10name, () => {
      getGames();
      setAddingGame(null);
      setMovingGame(null);
      cleanFilters();
    });
  };

  const getGames = () => {
    api.getTop10Games(top10name, (data) => {
      setGames(data);
      splitGames(data);
    });
  };

  const moveGame = (game, position) => {
    game.pos = position;
    api.putTop10Game(game, () => {
      getGames();
      setAddingGame(null);
      setMovingGame(null);
      cleanFilters();
    });
  };

  const removeGame = (game) => {
    api.deleteTop10Game(game.id, () => {
      getGames();
      setAddingGame(null);
      setMovingGame(null);
      cleanFilters();
    });
  };

  const drag = (game) => {
    setMovingGame(game);
  };
  const dragNew = (game) => {
    setAddingGame(game);
  };
  const allowDrop = (ev) => {
    ev.preventDefault();
  };
  const drop = (ev, pos) => {
    ev.preventDefault();
    if (movingGame != null) {
      moveGame(movingGame, pos);
    } else if (addingGame != null) {
      addGame(addingGame, pos);
    }
  };

  useEffect(() => {
    cleanFilters();
    getGames();
    api.getPlayedGames((data) => {
      setAllGames(data);
      gamesBackup = data;
    });
  }, []);

  const splitGames = (games) => {
    let result = [];
    games.forEach((game, index) => {
      game.name = game.game.name;
      if (index === 0) {
        result.push([game]);
      } else {
        if (game.pos > games[index - 1].pos + 1) {
          result.push([]);
          result.push([game]);
        } else if (game.pos === games[index - 1].pos) {
          result[game.pos - 1].push(game);
        } else {
          result.push([game]);
        }
      }
    });
    setOrder(result);
  };

  return (
    <div className="p-grid">
      <div className="p-grid p-col-10">
        <div className="p-col-12 top10header p-justify-center">
          <h1>Top 10 Games</h1>
        </div>
        <div className="p-grid p-col-12 top10games">
          {orderedGames.map((tier, index) => {
            return (
              <div
                className="p-grid p-col-4"
                onDrop={(ev) => {
                  drop(ev, index + 1);
                }}
                onDragOver={(ev) => {
                  allowDrop(ev);
                }}
              >
                <div className="p-col-1">
                  <h2>
                    <Position pos={index + 1}></Position>
                  </h2>
                </div>
                {tier.map((game) => {
                  return (
                    <div
                      className="p-col-3"
                      key={game.id}
                      // style={{ marginBottom: 10 }}
                      draggable="true"
                      onDragStart={() => {
                        drag(game);
                      }}
                    >
                      <GameBox key={game.id} game={game.game}></GameBox>
                    </div>
                  );
                })}
              </div>
            );
          })}
          <div
            className="p-grid p-col-4"
            onDrop={(ev) => {
              drop(ev, orderedGames.length + 1);
            }}
            onDragOver={(ev) => {
              allowDrop(ev);
            }}
          >
            <div className="p-col-1">
              <h2>
                <i className="pi pi-plus"></i>
              </h2>
            </div>
            <div className="p-col-10">
              <h2> New Position</h2>
              <p>Drag a game here to add a position</p>
            </div>
          </div>
          <div
            className="p-grid p-col-4"
            onDrop={(ev) => {
              ev.preventDefault();
              removeGame(movingGame);
            }}
            onDragOver={(ev) => {
              allowDrop(ev);
            }}
          >
            <div className="p-col-1">
              <h2>
                <i className="pi pi-trash"></i>
              </h2>
            </div>
            <div className="p-col-10">
              <h2> Remove</h2>
              <p>Drag a game here to remove it</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-grid p-col-2">
        <div className="p-col-12" style={{ paddingLeft: 0, marginBottom: 10 }}>
          <h2>Add Game</h2>
          <p>Drag a game from here to add it to the list</p>
          <div className="filter_item">
            <span className="p-input-icon-left">
              <i className="pi pi-search" />
              <InputText
                id="fname"
                placeholder="Name"
                onChange={(e) => filterName(e.target.value)}
              />
            </span>
          </div>
        </div>
        <ScrollPanel style={{ width: "60%", height: "60vh" }}>
          <div>
            {allGames.map((game) => {
              return (
                <div
                  className="p-d-inline"
                  draggable="true"
                  onDragStart={() => {
                    dragNew(game);
                  }}
                >
                  <GameBox key={game.id} game={game}></GameBox>
                </div>
              );
            })}
          </div>
        </ScrollPanel>
      </div>
    </div>
  );
};

export default Top10Games;
