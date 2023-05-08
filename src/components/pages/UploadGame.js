import { usePlayedGames } from "../../hooks/usePlayedGames";
import { useMessages } from "../../hooks/useMessages";
import { useNavigate } from "react-router-dom";
import { playedgames } from "../../routes";

import UploadGameForm from "../utils/forms/UploadGameForm";

function UploadGame() {
  const { uploadGame } = usePlayedGames()
  const { message } = useMessages()
  const navigator = useNavigate()

  const onSubmit = (data) => {
    uploadGame(data, () => {
      message('info', 'Game Uploaded Successfully')
      navigator(playedgames)
    })
  }

  return (
    <div className="w-6 p-4 mx-auto text-center">
      <h1>Upload Game</h1>
      <div className="shadow-6">
        <UploadGameForm onSubmit={onSubmit} />
      </div>
      
    </div>
  )
}

export default UploadGame