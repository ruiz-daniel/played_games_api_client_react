import { usePlayedGames } from "../../hooks/usePlayedGames";
import { useMessages } from "../../hooks/context hooks/useMessages";
import { useNavigation } from "../../hooks/useNavigation";

import UploadGameForm from "../utils/forms/UploadGameForm";
import DashboardButton from "../utils/DashboardButton";
import { useState } from "react";
import { UploadGameData } from "../../models/types";
import { PlayedGame } from "../../models/PlayedGame";
import { classNames } from "primereact/utils";

function UploadGame() {
  const { uploadGame } = usePlayedGames();
  const { message } = useMessages();
  const navigator = useNavigation();
  const [viewMode, setViewMode] = useState<"manual" | "igdb" | undefined>();

  const onSubmit = (data: UploadGameData) => {
    uploadGame(data, () => {
      message("info", "Game Uploaded Successfully");
    });
  };

  const setManualView = () => {
    setViewMode(viewMode === "manual" ? undefined : "manual");
  };
  const setIGDBView = () => {
    setViewMode(viewMode === "igdb" ? undefined : "igdb");
  };

  const buttonsClassName = "rounded bg-cyan-100 hover:bg-cyan-300 w-120 gap-4";

  return (
    <div className="flex flex-col items-center pt-4 gap-4">
      <h1 className="font-extrabold text-4xl">Upload Game</h1>
      <div className="flex gap-6">
        <DashboardButton
          action={setManualView}
          icon="upload"
          text={"Manual Upload"}
          className={classNames(buttonsClassName, {
            "bg-cyan-300": viewMode === "manual",
          })}
        />
        <DashboardButton
          action={setIGDBView}
          icon="download"
          text={"Import from IGDB"}
          className={classNames(buttonsClassName, {
            "bg-cyan-300": viewMode === "igdb",
          })}
        />
      </div>
      {viewMode === "manual" && (
        <div className="w-240">
          <UploadGameForm onSubmit={onSubmit} />
        </div>
      )}
    </div>
  );
}

export default UploadGame;
