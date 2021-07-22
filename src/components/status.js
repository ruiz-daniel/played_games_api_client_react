import React from "react";

const status = (props) => {
  const getStatus = () => {
    if (props.status === "Completed") return "status score-good";
    else if (props.status === "Dropped") return " status score-bad";
    else if (
      props.status === "Playing" ||
      props.status === "Played" ||
      props.status === "On Hold"
    )
      return "status score-mid";
  };
  return <span className={getStatus()}>{props.status}</span>;
};

export default status;
