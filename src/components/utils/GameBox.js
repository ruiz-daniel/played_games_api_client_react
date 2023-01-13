import React from 'react'
import { useHistory } from 'react-router-dom'
import * as routes from '../../routes'

import Score from './score'
import Status from './status'

const GameBox = (props) => {
  const history = useHistory()
  const editEvent = () => {
    history.push({
      pathname: routes.gamedetails,
      state: {
        // location state
        gameid: props.game._id,
      },
    })
  }

  return (
    <div className="game-box-container">
      <div className="game-box-img" onClick={editEvent}>
        <img
          alt="Game Cover"
          src={
            props.game.cover
              ? props.game.cover
              : 'https://localhost:5001/game_images/no-cover.jpg'
          }
        />
        <div className="game-details-panel">
          <div className="details-icon">
            <span className="pi pi-pencil"></span>
          </div>
        </div>
        <Status status={props.game.completion.name}></Status>
        <Score score={props.game.score}></Score>
      </div>

      <p>{props.game.name}</p>
    </div>
  )
}

export default GameBox
