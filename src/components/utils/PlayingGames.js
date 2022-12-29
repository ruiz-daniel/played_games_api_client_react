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
    api.PlayedGamesApi.getPlayingGames(sessionStorage.getItem('userid'),(data) => {
      setGames(data)
    })
  }, [])

  const editEvent = (game) => {
    history.push({
      pathname: routes.gamedetails,
      state: {
        // location state
        gameid: game.id,
      },
    })
  }

  const responsiveOptions = [
    {
      breakpoint: '1024px',
      numVisible: 1,
      numScroll: 1,
    },
    {
      breakpoint: '600px',
      numVisible: 1,
      numScroll: 1,
    },
    {
      breakpoint: '480px',
      numVisible: 1,
      numScroll: 1,
    },
  ]

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
            <div className="details-status">
              {game.status.id == 3 && (
                <h2 className="status_tittle">Currently Playing</h2>
              )}
              {game.status.id == 4 && (
                <h2 className="status_tittle">On Hold</h2>
              )}
              {game.status.id == 6 && (
                <h2 className="status_tittle">Currently Replaying</h2>
              )}
            </div>
            <div className="details-name">
              <h1>{game.name}</h1>
              <h3>
                Current Score: <Score score={game.rating}></Score>
              </h3>
            </div>
          </div>
        )}
        <img src={game.image} alt="Game Cover"></img>
      </div>
    )
  }

  return (
    <div className="playing-carrousel">
      <Carousel
        value={games}
        numVisible={1}
        numScroll={1}
        responsiveOptions={responsiveOptions}
        className="custom-carousel"
        circular
        showNavigators={false}
        showIndicators={false}
        autoplayInterval={3000}
        itemTemplate={template}
      />
    </div>
  )
}

export default PlayingGames
