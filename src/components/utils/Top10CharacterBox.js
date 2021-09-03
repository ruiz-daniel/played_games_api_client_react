import React, { useRef } from "react";

const Top10CharacterBox = (props) => {
  const op = useRef(null);
  return (
    <div className="top10characterbox">
      <img
        className="top10charactersimg"
        src="https://localhost:5001/game_images/YoRHa_No.2_Type_B.png" //{props.character.image}
        // onMouseEnter={(e) => op.current.toggle(e)}
        // onMouseLeave={(e) => op.current.toggle(e)}
        alt="props.character.name"
      ></img>
      <h1 className="top10header">1</h1>
    </div>
  );
};

export default Top10CharacterBox;
