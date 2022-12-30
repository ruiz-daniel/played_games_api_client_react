/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect } from 'react'
import api from '../../services/IApi'

import { Image } from 'primereact/image'
import { Button } from 'primereact/button'
import { confirmDialog } from 'primereact/confirmdialog'
import { Dialog } from 'primereact/dialog'

import Status from '../utils/status'
import EditGame from '../utils/EditGame'

import { useLocation, useHistory } from 'react-router-dom'
import { playedgames } from '../../routes'

import { Toast } from 'primereact/toast'
import GameInfoBox from '../utils/GameInfoBox'

const GameDetails = () => {
  const location = useLocation()
  const history = useHistory()
  const [game, setGame] = useState({
    id: '',
    name: '',
    year: '',
    developer: '',
    publisher: '',
    genre: '',
    rating: 0,
    played_hours: 0,
    status: {
      id: '',
      name: '',
    },
    platform: {
      id: '',
      name: '',
    },
    description: '',
  })
  const [image, setImage] = useState()
  const toast = useRef(null)
  const [editing, setEditing] = useState(false)

  const getGame = () => {
    var gameid = location.state.gameid
    api.PlayedGamesApi.getPlayedGameById(gameid, onGetGame, onErrorGetGame)
  }
  const onGetGame = (data) => {
    setGame(data)
    setImage(data.image)
  }
  const onErrorGetGame = (error) => {
    toast.current.show({
      severity: 'error',
      summary: error.message,
      life: 3000,
    })
  }
  const onUpdate = () => {
    setEditing(false)
    getGame()
  }

  const deleteGame = () => {
    api.PlayedGamesApi.deletePlayedGame({ id: game.id }, () => {
      toast.current.show({
        severity: 'error',
        summary: 'Game Deleted Successfully',
        life: 3000,
      })
      setTimeout(function () {
        history.push(playedgames)
      }, 3000)
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

  useEffect(() => {
    getGame()
  }, [])

  return (
    <div className="game-details-wrapper">
      <Toast ref={toast} />
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
        <EditGame game={game} callback={onUpdate} />
      </Dialog>
      <h2>{game.name}</h2>
      <div className="game-details-image flex flex-column ">
        <Image src={image} alt={game.name} preview />
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
        {game.developer && (
          <p>
            Developed by <span>{game.developer}</span>
          </p>
        )}
        {game.publisher && (
          <p>
            Published by <span>{game.publisher}</span>
          </p>
        )}
        {game.genre && (
          <p>
            Genre: <span>{game.genre}</span>
          </p>
        )}
        <div className="flex flex-wrap game-details-info-box">
          <GameInfoBox
            type="platform"
            style={{ marginRight: '10px' }}
            game={game}
          />
          {game.year && (
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
          {game.rating && (
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

        <p>
          <Status status={game.status.name} />{' '}
        </p>
        {game.description && game.description !== '' && (
          <p>{game.description}</p>
        )}
      </div>
    </div>
  )
}

export default GameDetails
