import { usePlayedGames } from "../../hooks/usePlayedGames";
import { useMessages } from "../../hooks/context hooks/useMessages";
import { useNavigation } from "../../hooks/useNavigation";

import UploadGameForm from "../utils/forms/UploadGameForm";

function UploadGame() {
  const { uploadGame } = usePlayedGames()
  const { message } = useMessages()
  const navigator = useNavigation()

  const onSubmit = (data) => {
    uploadGame(data, (data) => {
      message('info', 'Game Uploaded Successfully')
      navigator.goToGameDetails(data._id)
    })
  }

  return (
    <div className="flex flex-column justify-content-center align-items-center">
      <h1>Upload Game</h1>
      <div className="upload-game-form-wrapper">
        <UploadGameForm onSubmit={onSubmit} />
      </div>
      
    </div>
  )
}

export default UploadGame