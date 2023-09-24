import React from 'react'
import { useNavigate } from 'react-router-dom'
import * as routes from '../../../routes'
import  no_cover  from '../../../images/no-cover.jpg'
import { usePlayedGames } from '../../../hooks/usePlayedGames'

import Score from '../score'
import Status from '../status'

const GameBox = ({ game, width = 300, imageHeight = 150 }) => {
  
  const navigator = useNavigate()
  const editEvent = () => {
    navigator(`${routes.gamedetails}/?id=${game._id}`)
  }

  const { updateGame } = usePlayedGames()

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
      </div>

      <p>{game.name}</p>
    </div>
  )
}

export default GameBox
