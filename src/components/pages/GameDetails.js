import { useGame } from '../../hooks/useGame'
import { useToggle } from '../../hooks/useToggle'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { playedgames } from '../../routes'

import { Image } from 'primereact/image'
import { Button } from 'primereact/button'
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog'
import { Dialog } from 'primereact/dialog'

import GameImages from '../utils/forms/GameImages'
import EditGame from '../utils/forms/EditGame'
import GameInfo from '../utils/cards/GameInfo'
import  no_cover  from '../../images/no-cover.jpg'

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
      {game && <div className="game-details-wrapper">
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
        <Dialog 
          header="Game Images" 
          visible={images.toggleValue} 
          style={{ width: '50vw' }} 
          onHide={images.toggle}
        >
          <GameImages onSubmit={handleImagesSubmit} />
        </Dialog>

        <h2>{game.name}</h2>
        <div className="game-details-image flex flex-column ">
          <Image src={game.cover || no_cover} alt={game.name} preview />

          <div className="game-details-buttons flex justify-content-end gap-3 mt-2">
            <Button className='pink-button' label='Channge Images' onClick={images.toggle} />
            <Button
              icon='pi pi-pencil'
              className="p-button-outlined p-button-rounded p-button-warning edit-button"
              onClick={editing.toggle}
            />
            <Button
              icon="pi pi-trash"
              className="p-button-rounded p-button-outlined p-button-danger delete-button"
              onClick={confirm}
            />
            <ConfirmDialog />
          </div>
        </div>
        <GameInfo game={game} />

        
      </div>}
    </>
  )
}

export default GameDetails
