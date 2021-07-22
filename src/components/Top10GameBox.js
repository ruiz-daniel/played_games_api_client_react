import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
import GameBox from "./utils/GameBox";
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
    </div>
  );
};

export default Top10GameBox;
