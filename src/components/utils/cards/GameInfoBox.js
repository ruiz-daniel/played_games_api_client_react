import React from 'react'

import Score from '../score'

const GameInfoBox = ({ type, style, game }) => {
  return (
    <div className="game-info-box-container" style={style || null}>
      {type === 'platform' && (
        <div>
          <i className="pi pi-desktop"></i>
          <p>
            Played On: <span>
              {game
                ? game.platform.name.length > 12
                  ? game.platform.short_name
                  : game.platform.name
                : ''}
            </span>
          </p>
        </div>
      )}
      {type === 'year' && (
        <div>
          <i className="pi pi-calendar"></i>
          <p>
            Released: <span>{game ? game.release_year : ''}</span>
          </p>
        </div>
      )}
      {type === 'played_year' && (
        <div>
          <i className="pi pi-calendar"></i>
          <p>
            Played: <span>{game ? game.played_year : ''}</span>
          </p>
        </div>
      )}
      {type === 'score' && (
        <div className="game-info-box-number">
          <p className="info-number">
            <Score score={game.score} />
          </p>
          Score
        </div>
      )}
      {type === 'hours' && (
        <div className="game-info-box-number">
          <p className="info-number">{game.played_hours}</p>
          Hours
        </div>
      )}
      {type === 'steam' && (
        <div className="flex flex-column justify-content-center info-steam">
          <a href={game.steam_page} target="blank">
            <img
              src="https://store.cloudflare.steamstatic.com/public/shared/images/header/logo_steam.svg?t=962016"
              alt="Steam Page"
            ></img>
          </a>
        </div>
      )}
    </div>
  )
}

export default GameInfoBox
