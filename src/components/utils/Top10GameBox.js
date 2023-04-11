import React, { useRef } from "react";
import GameBox from "./GameBox";
import { OverlayPanel } from "primereact/overlaypanel";
import  no_cover  from '../../images/no-cover.jpg'
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
  const op = useRef(null);
  return (
    <div className={classes.root}>
      <img
        style={classes.img}
        src={props.game.cover || no_cover}
        alt="Game"
        onClick={(e) => op.current.toggle(e)}
        // onMouseLeave={(e) => op.current.toggle(e)}
      ></img>
      <div className={classes.details}></div>
      <OverlayPanel ref={op} className="overlaypanel">
        <GameBox game={props.game}></GameBox>
      </OverlayPanel>
    </div>
  );
};

export default Top10GameBox;
