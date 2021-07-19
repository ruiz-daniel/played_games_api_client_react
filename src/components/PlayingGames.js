/* eslint-disable eqeqeq */
import React, { useState, useEffect } from "react";
import api from "../services/APICalls";
import GameBox from "./Top10GameBox";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  item: {},
  section: {
    marginTop: "1rem",
    marginBottom: "1rem",
    // borderTopStyle: "solid",
    // borderTopWidth: 1,
    // borderBottomStyle: "solid",
    // borderBottomWidth: 1,
  },
  filterField: {
    marginRight: "1rem",
  },
}));

const PlayingGames = () => {
  const classes = useStyles();
  const [games, setGames] = useState([]);

  useEffect(() => {
    api.getPlayingGames((data) => {
      setGames(data);
    });
  }, []);

  return (
    <div>
      <Grid
        container
        spacing={1}
        style={{ margin: "0.2rem", marginTop: "1rem", position: "relative" }}
      >
        <Typography style={{ marginBottom: 30 }} variant="h4">
          Playing Right Now
        </Typography>
        {games.map((game) => {
          return (
            <Grid
              item
              xs={12}
              key={game.id}
              style={{ marginBottom: 20, position: "relative" }}
            >
              <GameBox key={game.id} game={game}></GameBox>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export default PlayingGames;
