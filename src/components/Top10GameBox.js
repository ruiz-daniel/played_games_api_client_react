import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
import GameBox from "./GameBox";
import Paper from "@material-ui/core/Paper";
import { useHistory } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {},
  paper: {
    display: "flex",
  },
  img: {
    boxShadow: "5px 5px 5px grey",
    marginTop: 2,
    width: 160,
    height: 90,
    position: "relative",
    cursor: "pointer",
  },
  details: {
    paddingTop: 5,
    paddingLeft: 15,
    maxHeight: 70,
  },
});

const Top10GameBox = (props) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div className={classes.root}>
      <img
        className={classes.img}
        src={props.game.image}
        onClick={handleClick}
        alt="Game"
      ></img>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <GameBox game={props.game}></GameBox>
      </Popover>
      <div className={classes.details}></div>

      {/* <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            component="img"
            alt="Game Image"
            height="150"
            image={props.game.image}
            title={props.game.name}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {props.game.name}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Typography variant="h6">Score: {props.game.rating}</Typography>
        </CardActions>
      </Card> */}
    </div>
  );
};

export default Top10GameBox;
