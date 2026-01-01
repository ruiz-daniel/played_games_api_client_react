import React from "react";

const status = (props) => {
  const getStatus = () => {
    if (props.status === "Completed")
      return "px-2 rounded-xl bg-green-500";
    else if (props.status === "Playing" || props.status === "Replaying") return "px-2 rounded-xl bg-blue-500"
    else if (props.status === "Dropped") return "px-2 rounded-xl bg-red-500";
    else 
      return "px-2 rounded-xl bg-yellow-500";
  };
  return <span className={getStatus()}>{props.status}</span>;
};

export default status;
