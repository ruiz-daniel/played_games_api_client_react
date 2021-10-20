import React, { useRef } from "react";

const Top10CharacterBox = (props) => {
  const op = useRef(null);
  return (
    <div className="top10characterbox">
      <img
        className="top10charactersimg"
        src={props.character.character.image}
        // onMouseEnter={(e) => op.current.toggle(e)}
        // onMouseLeave={(e) => op.current.toggle(e)}
        alt={props.character.name}
      ></img>
      <h1 className="top10header">{props.character.name}</h1>
      <h1 className="top10header">{props.character.pos}</h1>
    </div>
  );
};

export default Top10CharacterBox;
