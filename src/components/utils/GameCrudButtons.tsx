import { usePlayedGames } from "../../hooks/usePlayedGames";
import { useToggle } from "../../hooks/useToggle";
import { useNavigation } from "../../hooks/useNavigation";

import { Button } from "primereact/button";
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog'
import { Dialog } from 'primereact/dialog'
import EditGame from "./forms/EditGame";

const GameCrudButtons = ({game, mode = 'basic'}) => {
  const { updateGame, removeGame } = usePlayedGames()
  const { toggle, toggleValue } = useToggle()
  const navigator = useNavigation()

  const confirm = () => {
    confirmDialog({
      message: 'Are you sure you want to delete this game?',
      header: 'Delete Game',
      icon: 'pi pi-exclamation-triangle',
      acceptClassName: 'p-button-danger',
      accept: () => removeGame(game._id, () => navigator.goToPlayedGames),
    })
  }

  const onUpdate = (data) => {
    updateGame({...data, _id: game._id}, toggle)
  }

  return (
    <>
      <Dialog
        visible={toggleValue}
        showHeader={false}
        onHide={toggle}
        dismissableMask
      >
        <EditGame game={game} onSubmit={onUpdate} />
      </Dialog>
      {mode === 'basic' && 
      <div className="flex justify-content-center gap-3">
        <Button
          icon='pi pi-pencil'
          label="Edit Game"
          className="p-button-outlined edit-button"
          onClick={toggle}
        />
        <Button
          icon="pi pi-trash"
          label="Delete Game"
          className=" p-button-outlined delete-button"
          onClick={confirm}
        />
        <ConfirmDialog />
      </div>}
    </>
  )
}

export default GameCrudButtons