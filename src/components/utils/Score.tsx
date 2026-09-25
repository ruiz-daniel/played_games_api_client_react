/* eslint-disable eqeqeq */
import React from "react";

const Score = ({ score }: { score: number }) => {
  const getScore = () => {
    if (score < 6) return "font-extrabold text-lg text-red-500";
    else if (score == 6 || score == 7)
      return " font-extrabold text-lg text-yellow-500";
    else if (score == 8 || score == 9)
      return " font-extrabold text-lg text-green-500";
    else return "font-extrabold text-lg  text-purple-500";
  };
  return <span className={getScore()}>{score}</span>;
};

export default Score;
