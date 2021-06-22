import React, { useState } from "react";
import api from "../services/APICalls";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Fab from "@material-ui/core/Fab";
import NavigationIcon from "@material-ui/icons/Navigation";
import { Input } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import { useLocation } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  item: {},
  section: {
    marginTop: "3rem",
  },
}));

const EditGame = (props) => {
  const classes = useStyles();
  const location = useLocation();
  console.log(location.state.game);
  const [name, setName] = useState(location.state.game.name);
  const [year, setYear] = useState(location.state.game.year);
  const [dev, setDev] = useState(location.state.game.developer);
  const [publisher, setPublisher] = useState(location.state.game.publisher);
  const [genre, setGenre] = useState(location.state.game.genre);
  const [rating, setRating] = useState(location.state.game.score);
  const [status, setStatus] = useState(location.state.game.status);
  const [platform, setPlatform] = useState(location.state.game.platform);
  const [image, setImage] = useState(location.state.game.image);
  const [platformList, setPlatformList] = useState([]);
  const [statusList, setStatusList] = useState([]);
  const [openPlatform, setOpenPlatform] = React.useState(false);
  const [openStatus, setOpenStatus] = React.useState(false);
  const loadingPlatforms = openPlatform && platformList.length === 0;
  const loadingStatuses = openStatus && statusList.length === 0;
  const [gameImage, setGameImage] = useState();

  const [success, setSuccess] = React.useState(false);
  const showSuccess = () => {
    setSuccess(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSuccess(false);
  };

  const handleSubmit = () => {
    api.putPlayedGame(
      {
        id: location.state.game.id,
        name,
        developer: dev,
        publisher,
        year,
        genre,
        rating,
        platformid: platform.id,
        statusid: status.id,
        image,
      },
      () => {
        showSuccess();
      }
    );
  };

  const uploadImage = async () => {
    await api.uploadImage(gameImage);
  };

  const uploadGameAndImage = () => {
    console.log(image);
    api.putPlayedGame(
      {
        id: location.state.game.id,
        name,
        developer: dev,
        publisher,
        year,
        genre,
        rating,
        platformid: platform.id,
        statusid: status.id,
        image: "https://localhost:5001/game_images/" + gameImage.name,
      },
      () => {
        uploadImage();
        showSuccess();
      }
    );
  };

  React.useEffect(() => {
    let active = true;

    if (!loadingPlatforms) {
      return undefined;
    }

    (async () => {
      const response = await api.fetchPlatforms();
      const platforms = await response.data;

      if (active) {
        setPlatformList(platforms);
      }
    })();

    return () => {
      active = false;
    };
  }, [loadingPlatforms]);

  React.useEffect(() => {
    let active = true;

    if (!loadingStatuses) {
      return undefined;
    }

    (async () => {
      const response = await api.fetchStatuses();
      const statuses = await response.data;

      if (active) {
        setStatusList(statuses);
      }
    })();

    return () => {
      active = false;
    };
  }, [loadingStatuses]);

  return (
    <div className={classes.root}>
      <h2>Edit Game Properties</h2>
      <Grid container spacing={1}>
        <Grid item xs={4}>
          <TextField
            id="gameName"
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            id="gameDev"
            label="Developer"
            value={dev}
            onChange={(e) => setDev(e.target.value)}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            id="gamePublisher"
            label="Publisher"
            value={publisher}
            onChange={(e) => setPublisher(e.target.value)}
          />
        </Grid>
      </Grid>
      <Grid container spacing={1} className={classes.section}>
        <Grid item xs={4}>
          <TextField
            id="gameYear"
            label="Year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            id="gameGenre"
            label="Genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            id="gameRating"
            label="Rating"
            type="number"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2} className={classes.section}>
        <Grid item xs={2}></Grid>
        <Grid item xs={4}>
          <Autocomplete
            id="gamePlatform"
            options={platformList}
            value={platform}
            onChange={(event, newValue) => {
              setPlatform(newValue);
            }}
            getOptionLabel={(option) => option.name}
            style={{ width: 250 }}
            open={openPlatform}
            onOpen={() => {
              setOpenPlatform(true);
            }}
            onClose={() => {
              setOpenPlatform(false);
            }}
            loading={loadingPlatforms}
            renderInput={(params) => <TextField {...params} label="Platform" />}
          />
        </Grid>
        <Grid item xs={4}>
          <Autocomplete
            id="gameStatus"
            options={statusList}
            value={status}
            onChange={(event, newValue) => {
              setStatus(newValue);
            }}
            getOptionLabel={(option) => option.name}
            style={{ width: 250 }}
            open={openStatus}
            onOpen={() => {
              setOpenStatus(true);
            }}
            onClose={() => {
              setOpenStatus(false);
            }}
            loading={loadingStatuses}
            renderInput={(params) => <TextField {...params} label="Status" />}
          />
        </Grid>
        <Grid container spacing={2} className={classes.section}>
          <Grid item xs={12}>
            <Input
              type="file"
              name="image"
              onChange={(e) => setGameImage(e.target.files[0])}
            ></Input>
          </Grid>
        </Grid>
      </Grid>
      <Grid container spacing={2} className={classes.section}>
        <Grid item xs={12}>
          <Fab
            variant="extended"
            style={{ marginRight: 10 }}
            onClick={handleSubmit}
          >
            <NavigationIcon className={classes.extendedIcon} />
            Upload Game
          </Fab>
          <Fab variant="extended" onClick={uploadGameAndImage}>
            <NavigationIcon className={classes.extendedIcon} />
            Upload Game & Image
          </Fab>
        </Grid>
        <Snackbar open={success} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success">
            UploadedGame
          </Alert>
        </Snackbar>
      </Grid>
    </div>
  );
};

export default EditGame;
