import React from "react";

const position = (props) => {
  const getPosition = () => {
    if (props.pos == 1) return " pos pos-1";
    else if (props.pos == 2) return " pos pos-2";
    else if (props.pos == 3) return " pos pos-3";
    else return "pos pos-x";
  };
  return <span className={getPosition()}>{props.pos}</span>;
};

export default position;
