import React from 'react'
import { useNavigation } from '../../../hooks/useNavigation'
import  no_cover  from '../../../images/no-cover.jpg'
import { usePlayedGames } from '../../../hooks/usePlayedGames'
import { ConfirmDialog } from 'primereact/confirmdialog'

import Score from '../score'
import Status from '../status'
import { useToggle } from '../../../hooks/useToggle'

const GameBox = ({ game, width = 300, imageHeight = 150 }) => {
  const navigator = useNavigation()
  const editEvent = () => {
    navigator.goToGameDetails(game._id)
  }
  const { updateGame, removeGame } = usePlayedGames()
  const deleteConfirmToggle = useToggle()

  const favorite = () => {
    updateGame({
      _id: game._id,
      favorite: !game.favorite
    })
  }

  const containerStyles = {
    width
  }

  return (
    <div className="game-box-container" style={containerStyles}>
      <div className="game-box-img">
        <img alt="Game Cover" src={game?.cover || no_cover} height={imageHeight} />
        <div className="game-details-panel">
          <div className="details-icon" onClick={editEvent}>
            <span className="pi pi-pencil"></span>
          </div>
        </div>
        {game.completion && (
          <Status status={game.completion.name}></Status>
        )}
        {game.score && <Score score={game.score}></Score>}
        <i className={`favorite-icon pi ${game.favorite ? 'pi-star-fill' : 'pi-star'}`} onClick={favorite} />
        <i className={`delete-icon pi pi-trash`} onClick={deleteConfirmToggle.toggle} />
      </div>
      <ConfirmDialog 
        visible={deleteConfirmToggle.toggleValue}
        onHide={deleteConfirmToggle.toggleOFF}
        header="Delete Game"
        icon='pi pi-exclamation-triangle'
        message='Are you sure you want to delete this game?'
        accept={() => removeGame(game._id)}
        reject={deleteConfirmToggle.toggleOFF}
       />
      <p>{game.name}</p>
    </div>
  )
}

export default GameBox
