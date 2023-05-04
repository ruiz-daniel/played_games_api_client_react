import React from 'react'
import { useNavigate } from 'react-router-dom'
import * as routes from '../../../routes'
import  no_cover  from '../../../images/no-cover.jpg'

import Score from '../score'
import Status from '../status'

const GameBox = ({ game }) => {
  const navigator = useNavigate()
  const editEvent = () => {
    navigator(`${routes.gamedetails}/?id=${game._id}`)
  }

  return (
    <div className="game-box-container">
      <div className="game-box-img" onClick={editEvent}>
        <img alt="Game Cover" src={game?.cover || no_cover} />
        <div className="game-details-panel">
          <div className="details-icon">
            <span className="pi pi-pencil"></span>
          </div>
        </div>
        {game.completion && (
          <Status status={game.completion.name}></Status>
        )}
        {game.score && <Score score={game.score}></Score>}
      </div>

      <p>{game.name}</p>
    </div>
  )
}

export default GameBox
