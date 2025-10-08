/* eslint-disable eqeqeq */
import React from "react";

const score = (props) => {
  const getScore = () => {
    if (props.score < 6) return "score score-bad";
    else if (props.score == 6 || props.score == 7) return " score score-mid";
    else if (props.score == 8 || props.score == 9) return " score score-good";
    else return "score score-perfect";
  };
  return <span className={getScore()}>{props.score}</span>;
};

export default score;
