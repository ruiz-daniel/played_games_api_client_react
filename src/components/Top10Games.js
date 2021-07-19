import React, { useState, useEffect } from "react";
import api from "../services/APICalls";
import GameBox from "./Top10GameBox";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import AddTop10Game from "./AddTop10Game";

const useStyles = makeStyles((theme) => ({
  root: {
    borderRight: "solid 1px",
  },
  container: {
    margin: "3rem",
  },
  item: {},
  section: {
    marginTop: "1rem",
    marginBottom: "1rem",
  },
  addSection: {
    marginTop: "0.1rem",
  },
}));

const Top10Games = (props) => {
  const classes = useStyles();
  const [games, setGames] = useState([]);
  const [orderedGames, setOrder] = useState([]);

  const addGame = (game, position) => {
    api.postTop10Game({ gameid: game.id, pos: position }, "top10games", () => {
      api.getTop10Games("top10games", (data) => {
        setGames(data);
        splitGames(data);
      });
    });
  };

  const moveGame = (game, position) => {
    api.putTop10Game(
      { id: game.id, gameid: game.gameid, pos: position },
      "top10games",
      () => {
        api.getTop10Games("top10games", (data) => {
          setGames(data);
          splitGames(data);
        });
      }
    );
  };

  const removeGame = (game) => {
    api.deleteTop10(game.id, "top10games", () => {
      api.getTop10Games("top10games", (data) => {
        setGames(data);
        splitGames(data);
      });
    });
  };

  useEffect(() => {
    api.getTop10Games("top10games", (data) => {
      setGames(data);
      splitGames(data);
    });
  }, []);

  const splitGames = (games) => {
    let result = [];
    games.forEach((game, index) => {
      if (index === 0) {
        result.push([game]);
      } else {
        if (game.pos === games[index - 1].pos) {
          result[game.pos - 1].push(game);
        } else {
          result.push([game]);
        }
      }
    });
    setOrder(result);
  };

  return (
    <Grid container>
      <Grid className={classes.root} item xs={9}>
        <div className={classes.container}>
          <div className={classes.section}>
            <h1>Top 10 Games</h1>
          </div>
          <div className={classes.section}>
            <Grid container spacing={1}>
              {orderedGames.map((tier, index) => {
                return (
                  <Grid
                    container
                    spacing={1}
                    style={{ marginBottom: 10, borderBottom: "solid 2px" }}
                  >
                    <Grid item xs={1}>
                      <h2>{index + 1}</h2>
                    </Grid>
                    {tier.map((game) => {
                      return (
                        <Grid
                          item
                          xs={3}
                          key={game.id}
                          style={{ marginBottom: 10 }}
                        >
                          <GameBox key={game.id} game={game.game}></GameBox>
                        </Grid>
                      );
                    })}
                  </Grid>
                );
              })}
            </Grid>
          </div>
        </div>
      </Grid>
      <Grid className={classes.addSection} item xs={3}>
        <AddTop10Game
          destination={props.destination}
          addGame={addGame}
          orderedGames={games}
          moveGame={moveGame}
          removeGame={removeGame}
        ></AddTop10Game>
      </Grid>
    </Grid>
  );
};

export default Top10Games;
