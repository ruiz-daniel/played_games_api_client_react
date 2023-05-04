/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react'
import { useGame } from '../../hooks/useGame'

import { Image } from 'primereact/image'
import { Button } from 'primereact/button'
import { confirmDialog } from 'primereact/confirmdialog'
import { Dialog } from 'primereact/dialog'
import { Chip } from 'primereact/chip'

import Status from '../utils/status'
import EditGame from '../utils/forms/EditGame'

import { useNavigate, useSearchParams } from 'react-router-dom'
import { playedgames } from '../../routes'

import GameInfoBox from '../utils/cards/GameInfoBox'

import  no_cover  from '../../images/no-cover.jpg'

const GameDetails = () => {
  const navigator = useNavigate()
  const [queryParams] = useSearchParams()
  const gameid = queryParams.get('id')
  const { game, update, remove} = useGame(gameid)
  
  const [editing, setEditing] = useState(false)

  const onUpdate = (data) => {
    update(data, () => {
      setEditing(false)
    })
  }

  const deleteGame = () => {
    remove(() => {
      navigator(playedgames)
    })
  }

  const confirm = () => {
    confirmDialog({
      message: 'Are you sure you want to delete this game?',
      header: 'Delete Game',
      icon: 'pi pi-exclamation-triangle',
      acceptClassName: 'p-button-danger',
      accept: () => deleteGame(),
    })
  }
  

  return (
    <>
      {game && <div className="game-details-wrapper">
        <Dialog
          visible={editing}
          showHeader={false}
          onHide={() => {
            setEditing(false)
          }}
          dismissableMask
          breakpoints={{ '960px': '70vw', '640px': '100vw' }}
          style={{ width: '50vw' }}
        >
          <EditGame game={game} onSubmit={onUpdate} />
        </Dialog>
        <h2>{game.name}</h2>
        <div className="game-details-image flex flex-column ">
          <Image src={game.cover || no_cover} alt={game.name} preview />

          <div className="game-details-buttons flex justify-content-end mt-2">
            <Button
              icon={editing ? 'pi pi-times' : 'pi pi-pencil'}
              className="p-button-outlined p-button-rounded p-button-warning edit-button"
              onClick={() => {
                setEditing(!editing)
              }}
            />
            <Button
              icon="pi pi-trash"
              className="p-button-rounded p-button-outlined p-button-danger ml-3 delete-button"
              onClick={confirm}
            />
          </div>
        </div>

        <div className="game-details-fields">
          {game.developers?.length > 0 && (
            <p>
              Developed by <span>{game.developers.join(', ')}</span>
            </p>
          )}
          {game.publishers?.length > 0 && (
            <p>
              Published by <span>{game.publishers.join(', ')}</span>
            </p>
          )}
          {game.genres?.length > 0 && (
            <div className="flex flex-wrap mb-3">
              {game.genres.map((genre) => (
                <Chip key={genre} className="mr-2" label={genre} />
              ))}{' '}
            </div>
          )}
          <div className="flex flex-wrap game-details-info-box">
            {game?.platform && (
              <GameInfoBox
                type="platform"
                style={{ marginRight: '10px' }}
                game={game}
              />
            )}
            {game.release_year && (
              <GameInfoBox
                type="year"
                style={{ marginRight: '10px' }}
                game={game}
              />
            )}
            {game.played_year && (
              <GameInfoBox
                type="played_year"
                style={{ marginRight: '10px' }}
                game={game}
              />
            )}
            {game.score && (
              <GameInfoBox
                type="score"
                style={{ marginRight: '10px' }}
                game={game}
              />
            )}
            {game.played_hours > 0 && (
              <GameInfoBox
                type="hours"
                style={{ marginRight: '10px' }}
                game={game}
              />
            )}
            {game.steam_page && (
              <GameInfoBox
                type="steam"
                style={{ marginRight: '10px' }}
                game={game}
              />
            )}
          </div>

          {game.completion && (
            <p>
              <Status status={game.completion.name} />
            </p>
          )}
          {game.description && game.description !== '' && (
            <p>{game.description}</p>
          )}
        </div>
      </div>}
    </>
  )
}

export default GameDetails
