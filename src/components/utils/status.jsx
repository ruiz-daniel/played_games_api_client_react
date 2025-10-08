import React from "react";

const status = (props) => {
  const getStatus = () => {
    if (props.status === "Completed" || props.status === "Replaying")
      return "status status-completed";
    else if (props.status === "Dropped") return " status status-dropped";
    else 
      return "status status-incomplete";
  };
  return <span className={getStatus()}>{props.status}</span>;
};

export default status;
