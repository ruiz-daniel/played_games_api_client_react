import { usePlayedGames } from "../../hooks/usePlayedGames";
import { useToggle } from "../../hooks/useToggle";
import { useNavigate } from "react-router-dom";
import { playedgames } from "../../routes";

import { Button } from "primereact/button";
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog'
import { Dialog } from 'primereact/dialog'
import EditGame from "./forms/EditGame";

const GameCrudButtons = ({game, mode = 'basic'}) => {
  const { updateGame, removeGame } = usePlayedGames()
  const { toggle, toggleValue } = useToggle()
  const navigator = useNavigate()

  const confirm = () => {
    confirmDialog({
      message: 'Are you sure you want to delete this game?',
      header: 'Delete Game',
      icon: 'pi pi-exclamation-triangle',
      acceptClassName: 'p-button-danger',
      accept: () => removeGame(game._id, () => navigator(playedgames)),
    })
  }

  const onUpdate = (data) => {
    updateGame(data, toggle)
  }

  return (
    <>
      <Dialog
        visible={toggleValue}
        showHeader={false}
        onHide={toggle}
        dismissableMask
        breakpoints={{ '960px': '70vw', '640px': '100vw' }}
        style={{ width: '50vw' }}
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