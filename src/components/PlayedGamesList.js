/* eslint-disable eqeqeq */
import React, { useState, useEffect } from "react";
import api from "../services/APICalls";
import GameBox from "./GameBox";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

import { Chart } from "primereact/chart";

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
  const classes = useStyles();
  const [games, setGames] = useState([]);
  const [filtering, setFiltering] = useState(false);
  const [avgScore, setAvgScore] = useState(0);

  // const tableView = () => {
  //   history.push("/tableview");
  // };
  // const gridview = () => {
  //   history.push("/");
  // };

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

  const getAvgScore = (data) => {
    let accumulate = 0;
    data.forEach((element) => {
      accumulate += element.rating;
    });
    setAvgScore(accumulate / data.length);
  };

  useEffect(() => {
    cleanFilters();
    api.getPlayedGames((data) => {
      setGames(data);
      getAvgScore(data);
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
    getAvgScore(filtered);
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
    <div>
      <h1>Played Games</h1>
      <h3>Showing: {games.length}</h3>
      <h3>Avg Score: {avgScore}</h3>
      <div></div>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography variant="h6">Filter By</Typography>
          <TextField
            className={classes.filterField}
            label="Name"
            onChange={(e) => filterName(e.target.value)}
          />
          <TextField
            className={classes.filterField}
            label="Developer"
            onChange={(e) => filterDev(e.target.value)}
          />
          <TextField
            className={classes.filterField}
            label="Publisher"
            onChange={(e) => filterPublisher(e.target.value)}
          />
          <TextField
            className={classes.filterField}
            label="Year"
            onChange={(e) => filterYear(e.target.value)}
          />
          <TextField
            className={classes.filterField}
            label="Genre"
            onChange={(e) => filterGenre(e.target.value)}
          />
          <TextField
            className={classes.filterField}
            label="Rating"
            type="number"
            onChange={(e) => filterRating(e.target.value)}
          />
          <TextField
            className={classes.filterField}
            label="Platform"
            onChange={(e) => filterPlatform(e.target.value)}
          />
          <TextField
            className={classes.filterField}
            label="Status"
            onChange={(e) => filterStatus(e.target.value)}
          />
        </Grid>
      </Grid>
      <Grid
        container
        spacing={1}
        style={{ margin: "0.2rem", marginTop: "1rem" }}
      >
        {/* <Grid item xs={12}>
          <IconButton
            aria-label="Grid View"
            fontSize="large"
            onClick={gridview}
          >
            <AppsIcon />
          </IconButton>
          <IconButton
            aria-label="Table View"
            fontSize="large"
            onClick={tableView}
          >
            <TocIcon />
          </IconButton>
        </Grid> */}
        {games.map((game) => {
          return (
            <Grid item xs={3} key={game.id}>
              <GameBox
                key={game.id}
                id={game.id}
                name={game.name}
                developer={game.developer}
                publisher={game.publisher}
                year={game.year}
                score={game.rating}
                status={game.status}
                genre={game.genre}
                platform={game.platform}
                image={game.image}
              ></GameBox>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export default PlayedGamesList;
