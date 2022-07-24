import React from 'react'

import Score from './score'

const GameInfoBox = ({ type, text, style, game }) => {
  return (
    <div className="game-info-box-container" style={style || null}>
      {type === 'platform' && (
        <div>
          {' '}
          <i className="pi pi-desktop"></i>
          <p>
            Played On:{' '}
            <span>
              {game
                ? game.platform.name.length > 12
                  ? game.platform.short_name
                  : game.platform.name
                : ''}
            </span>
          </p>{' '}
        </div>
      )}
      {type === 'year' && (
        <div>
          {' '}
          <i className="pi pi-calendar"></i>
          <p>
            Released: <span>{game ? game.year : ''}</span>
          </p>{' '}
        </div>
      )}
      {type === 'score' && (
        <div className="game-info-box-score">
          <p className="info-score">
            {' '}
            <Score score={game.rating} />
          </p>
          Score
        </div>
      )}
      {type === 'steam' && (
        <div className="flex flex-column info-steam">
          <a href={game.steam_page} target="blank">
            <img
              src="https://localhost:5001/game_images/Steam Logo.png"
              alt="Steam Page"
            ></img>
          </a>{' '}
        </div>
      )}
    </div>
  )
}

export default GameInfoBox
