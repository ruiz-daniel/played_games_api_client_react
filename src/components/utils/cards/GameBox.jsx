import React from 'react'
import { useNavigation } from '../../../hooks/useNavigation'
import  no_cover  from '../../../images/no-cover.jpg'
import { usePlayedGames } from '../../../hooks/usePlayedGames'
import { ConfirmDialog } from 'primereact/confirmdialog'

import Score from '../score'
import Status from '../status'
import { useToggle } from '../../../hooks/useToggle'

const GameBox = ({ game, width = 350, imageHeight = 170, updateGame, removeGame }) => {
  const navigator = useNavigation()
  const editEvent = () => {
    navigator.goToGameDetails(game._id)
  }
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
      <div className='game-box-header'>
        <i className={`favorite-icon pi ${game.favorite ? 'pi-star-fill' : 'pi-star'}`} onClick={favorite} />
        <p>{`${game.name.substring(0,30)}${game.name.length > 30 ? '...' : ''}`}</p>
        {game.score && <Score score={game.score}></Score>}
      </div>
      <div className="game-box-img">
        <img alt="Game Cover" src={game?.cover || no_cover} height={imageHeight} />
      </div>
      <div className='game-box-footer'>
        {game.completion && (
          <Status status={game.completion.name}></Status>
        )}
        <div className='flex gap-3'>
          <i className='details-icon pi pi-pencil' onClick={editEvent} />
          <i className={`delete-icon pi pi-trash`} onClick={deleteConfirmToggle.toggle} />
        </div>
        
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
      
    </div>
  )
}

export default GameBox
