/* eslint-disable eqeqeq */
import React from "react";

const score = (props) => {
  const getScore = () => {
    if (props.score < 6) return "font-bold text-lg text-red-500";
    else if (props.score == 6 || props.score == 7) return " font-bold text-lg text-yellow-500";
    else if (props.score == 8 || props.score == 9) return " font-bold text-lg text-green-500";
    else return "font-bold text-lg  text-purple-500";
  };
  return <span className={getScore()}>{props.score}</span>;
};

export default score;
