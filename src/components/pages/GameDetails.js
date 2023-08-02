import { useGame } from '../../hooks/useGame'
import { useToggle } from '../../hooks/useToggle'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { playedgames } from '../../routes'

import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog'
import { Dialog } from 'primereact/dialog'

import GameImageViewer from '../utils/cards/GameImageViewer'
import EditGame from '../utils/forms/EditGame'
import GameInfo from '../utils/cards/GameInfo'

const GameDetails = () => {
  const navigator = useNavigate()
  const [queryParams] = useSearchParams()
  const gameid = queryParams.get('id')
  const { game, update, remove, updateImages } = useGame(gameid)

  const editing = useToggle()
  const images = useToggle()

  const onUpdate = (data) => {
    update(data, editing.toggle)
  }

  const deleteGame = () => {
    remove(() => {
      navigator(playedgames)
    })
  }

  const confirm = () => {
    confirmDialog({
      message: 'Are you sure you want to delete this game?',
      header: 'Delete Game',
      icon: 'pi pi-exclamation-triangle',
      acceptClassName: 'p-button-danger',
      accept: () => deleteGame(),
    })
  }

  const handleImagesSubmit = (data) => {
    updateImages(data)
    images.toggle()
  }
  
  return (
    <>
      {game && <div className="flex flex-column gap-4 px-3">
        <Dialog
          visible={editing.toggleValue}
          showHeader={false}
          onHide={editing.toggle}
          dismissableMask
          breakpoints={{ '960px': '70vw', '640px': '100vw' }}
          style={{ width: '50vw' }}
        >
          <EditGame game={game} onSubmit={onUpdate} />
        </Dialog>
        <GameImageViewer game={game} handleImagesSubmit={handleImagesSubmit}  />
        <GameInfo game={game} />

        
      </div>}
    </>
  )
}

export default GameDetails
