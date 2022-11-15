/* eslint-disable eqeqeq */
import React, { useState, useEffect } from 'react'
import api from '../../services/IApi'
import { useHistory } from 'react-router'

import { Carousel } from 'primereact/carousel'

import Score from './score'
import Status from './status'
import * as routes from '../../routes'

const PlayingGames = () => {
  const history = useHistory()
  const [games, setGames] = useState([])

  useEffect(() => {
    api.PlayedGamesApi.getPlayingGames(
      (data) => {
        setGames(data)
      },
    )
  }, [])

  const editEvent = (game) => {
    history.push({
      pathname: routes.editgame,
      state: {
        // location state
        game: game,
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
      <div className="content p-grid">
        <div className="details p-col-6">
          {game.status.id == 3 && (
            <h2 className="status_tittle">Playing Right Now</h2>
          )}
          {game.status.id == 4 && <h2 className="status_tittle">On Hold</h2>}
          {game.status.id == 6 && <h2 className="status_tittle">Replaying</h2>}
          <h3>{game.name}</h3>
          <h3>Current Score:</h3>
          <h3>
            <Score score={game.rating}></Score>
          </h3>
          {game.status.name === 'Replaying' && (
            <h3>
              <Status status={game.status.name}></Status>
            </h3>
          )}
        </div>
        <div className="p-col-6">
          <img
            src={game.image}
            alt="Game Cover"
            onClick={() => {
              editEvent(game)
            }}
          ></img>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="playing-carrousel">
        <Carousel
          value={games}
          numVisible={1}
          numScroll={1}
          responsiveOptions={responsiveOptions}
          className="custom-carousel"
          circular
          autoplayInterval={3000}
          itemTemplate={template}
        />
      </div>
    </div>
  )
}

export default PlayingGames
