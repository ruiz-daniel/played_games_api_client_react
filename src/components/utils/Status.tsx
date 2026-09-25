import React from "react";
import { PlayedGame } from "../../models/PlayedGame";

const Status = ({ status }: { status: PlayedGame["completion"]["name"] }) => {
  const getStatus = () => {
    if (status === "Completed") return "px-2 rounded-xl bg-green-500";
    else if (status === "Playing" || status === "Replaying")
      return "px-2 rounded-xl bg-blue-500";
    else if (status === "Dropped") return "px-2 rounded-xl bg-red-500";
    else return "px-2 rounded-xl bg-yellow-500";
  };
  return <span className={getStatus()}>{status}</span>;
};

export default Status;
