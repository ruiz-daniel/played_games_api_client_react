import React, { useState, useEffect } from "react";
import api from "../services/APICalls";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: 20,
    display: "inline-grid",
  },
  item: {},
  section: {
    marginTop: "1rem",
    marginBottom: "1rem",
  },
}));

const AddTop10Game = (props) => {
  const classes = useStyles();
  const [games, setGames] = useState([]);
  const [selectedGame, selectGame] = useState({
    name: "No game selected",
    rating: 0,
  });
  const [pos, setPos] = useState();
  const [modGame, modifyGame] = useState();
  const [modPos, modifyPos] = useState();

  const [remove, setRemoveGame] = useState();

  useEffect(() => {
    api.getPlayedGames((data) => {
      setGames(data);
    });
  }, []);

  const addGame = () => {
    if (selectedGame.rating > 0) {
      props.addGame(selectedGame, pos);
    }
  };

  const moveGame = () => {
    if (modGame) {
      props.moveGame(modGame, modPos);
    }
  };

  const removeGame = () => {
    if (remove) {
      props.removeGame(remove);
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.section}>
        <h2>Add Game</h2>
      </div>

      <div className={classes.section}>
        <Autocomplete
          id="gamePlatform"
          options={games}
          value={selectedGame}
          onChange={(event, newValue) => {
            selectGame(newValue);
          }}
          getOptionLabel={(option) => option.rating + ": " + option.name}
          style={{ width: 400 }}
          renderInput={(params) => <TextField {...params} label="Game" />}
        />
      </div>
      <div className={classes.section}>
        <TextField
          label="Position"
          type="number"
          value={pos}
          onChange={(e) => setPos(e.target.value)}
        />
      </div>
      <div className={classes.section} style={{ marginBottom: 50 }}>
        <Fab variant="extended" onClick={addGame}>
          <AddIcon />
          Add Game
        </Fab>
      </div>

      <div>
        <h2>Move Game</h2>
      </div>
      <div className={classes.section}>
        <Autocomplete
          options={props.orderedGames}
          value={modGame}
          onChange={(event, newValue) => {
            modifyGame(newValue);
          }}
          getOptionLabel={(option) => option.game.name}
          style={{ width: 400 }}
          renderInput={(params) => <TextField {...params} label="Game" />}
        />
      </div>
      <div className={classes.section}>
        <TextField
          label="Position"
          type="number"
          value={modPos}
          onChange={(e) => modifyPos(e.target.value)}
        />
      </div>
      <div className={classes.section} style={{ marginBottom: 50 }}>
        <Fab variant="extended" onClick={moveGame}>
          <AddIcon />
          Move Game
        </Fab>
      </div>

      <div>
        <h2>Remove Game</h2>
      </div>
      <div className={classes.section}>
        <Autocomplete
          options={props.orderedGames}
          value={modGame}
          onChange={(event, newValue) => {
            setRemoveGame(newValue);
          }}
          getOptionLabel={(option) => option.game.name}
          style={{ width: 400 }}
          renderInput={(params) => <TextField {...params} label="Game" />}
        />
      </div>
      <div className={classes.section} style={{ marginBottom: 50 }}>
        <Fab variant="extended" onClick={removeGame}>
          <AddIcon />
          Remove Game
        </Fab>
      </div>
    </div>
  );
};

export default AddTop10Game;
