import React from "react";
import GameBox from "./GameBox";
const classes = {
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
};

const Top10GameBox = (props) => {
  return (
    <div className={classes.root}>
      <img style={classes.img} src={props.game.image} alt="Game"></img>
      <div className={classes.details}></div>
    </div>
  );
};

export default Top10GameBox;
