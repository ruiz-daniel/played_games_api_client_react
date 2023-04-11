/* eslint-disable eqeqeq */
import React, { useState, useEffect } from 'react'
import api from '../../services/IApi'
import { useHistory } from 'react-router'

import { Carousel } from 'primereact/carousel'

import Score from './score'
import * as routes from '../../routes'

const PlayingGames = () => {
  const history = useHistory()
  const [games, setGames] = useState([])
  const [details, showDetails] = useState(true)

  useEffect(() => {
    api.PlayedGamesApi.getPlayingGames((data) => {
      setGames(data)
    })
  }, [])

  const editEvent = (game) => {
    history.push({
      pathname: routes.gamedetails,
      state: {
        // location state
        gameid: game._id,
      },
    })
  }

  const template = (game) => {
    return (
      <div
        className="content"
        onClick={() => {
          editEvent(game)
        }}
        onMouseEnter={() => {
          showDetails(false)
        }}
        onMouseLeave={() => {
          showDetails(true)
        }}
      >
        {details && (
          <div className="details">
            <div className="details-name">
              <h2>{game.name}</h2>
              <h3>
                Current Score: <Score score={game.score}></Score>
              </h3>
            </div>
          </div>
        )}
        <img src={game.cover} alt="Game Cover"></img>
      </div>
    )
  }

  return (
    <div className="playing-carrousel">
      {games.length > 0 && <Carousel
        value={games}
        numVisible={1}
        numScroll={1}
        className="custom-carousel"
        circular
        showNavigators={false}
        autoplayInterval={3000}
        itemTemplate={template}
      />}
    </div>
  )
}

export default PlayingGames
