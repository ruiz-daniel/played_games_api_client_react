import React, { useState, useEffect } from "react";
import api from "../../services/APICalls";
import GameBox from "../utils/Top10GameBox";
import Position from "../utils/position";
import AddTop10Game from "./AddTop10Game";
import { useLocation } from "react-router-dom";

const Top10Games = (props) => {
  const location = useLocation();
  const [games, setGames] = useState([]);
  const [orderedGames, setOrder] = useState([]);
  const [top10name, setTop10Name] = useState(location.state.top10name);

  const addGame = (game, position) => {
    api.postTop10Game({ gameid: game.id, pos: position }, top10name, () => {
      getGames();
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
    });
  };

  const removeGame = (game) => {
    api.deleteTop10Game(game.id, () => {
      getGames();
    });
  };

  useEffect(() => {
    getGames();
  }, []);

  const splitGames = (games) => {
    let result = [];
    games.forEach((game, index) => {
      console.log(result);
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
      <div className="p-col-12 ">
        <div className="p-grid ">
          <div className="p-col-2 top10menu"></div>
          <div className="p-col-7 p-grid p-justify-center">
            <div className="p-col-12 top10header">
              <h1>Top 10 Games</h1>
            </div>
            {orderedGames.map((tier, index) => {
              return (
                <div className="p-grid p-col-4 top10group">
                  <div className="p-col-1">
                    <h2>
                      <Position pos={index + 1}></Position>
                    </h2>
                  </div>
                  {tier.map((game) => {
                    return (
                      <div
                        className="p-col-2"
                        key={game.id}
                        style={{ marginBottom: 10 }}
                      >
                        <GameBox key={game.id} game={game.game}></GameBox>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
          <div className="p-col-3 top10management">
            <AddTop10Game
              destination={props.destination}
              addGame={addGame}
              orderedGames={games}
              moveGame={moveGame}
              removeGame={removeGame}
            ></AddTop10Game>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Top10Games;
