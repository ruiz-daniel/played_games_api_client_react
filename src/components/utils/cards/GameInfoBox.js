import React from 'react'

import Score from '../score'

const GameInfoBox = ({ type, style, game }) => {
  const containerStyles = {
    width: 160,
    height: 105,
    ...style
  }
  return (
    <div className="game-info-box-container" style={containerStyles}>
      {type === 'platform' && (
        <>
          <div className='game-info-box-icon'>
            <i className="pi pi-desktop"></i>
          </div>
          <div className='game-info-box-text'>
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
        </>
        
      )}
      {type === 'year' && (
        <>
          <div className='game-info-box-icon'>
            <i className="pi pi-calendar"></i>
          </div>
          <div className='game-info-box-text'>
            <p>
              Released: <span>{game ? game.release_year : ''}</span>
            </p>
          </div>
        </>
      )}
      {type === 'played_year' && (
        <>
          <div className='game-info-box-icon'>
            <i className="pi pi-calendar"></i>
          </div>
          <div className='game-info-box-text'>
            <p>
             Played: <span>{game ? game.played_year : ''}</span>
            </p>
          </div>
        </>
      )}
      {type === 'score' && (
        <>
          <div className='game-info-box-icon'>
            <p className="info-number">
              <Score score={game.score} />
            </p>
          </div>
          <div className='game-info-box-text'>
            <p>
              Score
            </p>
          </div>
        </>
      )}
      {type === 'hours' && (
        <>
          <div className='game-info-box-icon'>
            <p className="info-number">{game.played_hours}</p>
          </div>
          <div className='game-info-box-text'>
            <p>
              Hours
            </p>
          </div>
        </>
      )}
      {type === 'steam' && (
        <div className="flex flex-column justify-content-center align-items-center info-steam">
          <a href={game.steam_page} target="blank">
            <img
              src="https://store.cloudflare.steamstatic.com/public/shared/images/header/logo_steam.svg?t=962016"
              alt="Steam Logo"
            ></img>
          </a>
        </div>
      )}
    </div>
  )
}

export default GameInfoBox
