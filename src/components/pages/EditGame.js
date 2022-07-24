/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect } from 'react'
import api from '../../services/APICalls'

import { useForm } from 'react-hook-form'

import { InputText } from 'primereact/inputtext'
import { Dropdown } from 'primereact/dropdown'
import { FileUpload } from 'primereact/fileupload'
import { Image } from 'primereact/image'
import { Button } from 'primereact/button'
import { confirmDialog } from 'primereact/confirmdialog'
import { InputTextarea } from 'primereact/inputtextarea'

import Score from '../utils/score'
import Status from '../utils/status'

import { useLocation, useHistory } from 'react-router-dom'
import { sr_images, playedgames } from '../../routes'

import { Toast } from 'primereact/toast'

const EditGame = () => {
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
  const [platformList, setPlatformList] = useState([])
  const [statusList, setStatusList] = useState([])
  const [platform, setPlatform] = useState()
  const [status, setStatus] = useState()
  const toast = useRef(null)
  const [editing, setEditing] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({})

  const getGame = () => {
    var gameid = location.state.gameid
    api.getPlayedGameById(gameid, onGetGame, onErrorGetGame)
  }
  const onGetGame = (data) => {
    setGame(data)
    setPlatform(data.platform)
    setStatus(data.status)
    setImage(data.image)
  }
  const onErrorGetGame = (error) => {
    toast.current.show({
      severity: 'error',
      summary: error.message,
      life: 3000,
    })
  }

  const onSubmit = (data) => {
    api.putPlayedGame(
      {
        id: game.id,
        name: data.name,
        developer: data.developer,
        publisher: data.publisher,
        year: data.year,
        genre: data.genre,
        rating: data.rating,
        platformid: platform.id,
        statusid: status.id,
        image,
        description: data.description,
        steam_page: data.steam_page,
        userid: sessionStorage.getItem('userid'),
      },
      () => {
        toast.current.show({
          severity: 'success',
          summary: 'Game Uploaded Successfully',
          life: 3000,
        })
        setEditing(false)
        getGame()
      },
    )
  }

  const deleteGame = () => {
    api.deletePlayedGame(location.state.game, () => {
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
    ;(async () => {
      const response = await api.fetchPlatforms()
      const platforms = await response.data
      setPlatformList(platforms)
    })()
  }, [])

  useEffect(() => {
    ;(async () => {
      const response = await api.fetchStatuses()
      const statuses = await response.data
      setStatusList(statuses)
    })()
  }, [])

  useEffect(() => {
    getGame()
  }, [])

  const onupload = async (e) => {
    await api.uploadImage(e.files[0], sessionStorage.getItem('userid'))
    setImage(
      sr_images + sessionStorage.getItem('userid') + '/' + e.files[0].name,
    )
    // e.options.clear()
  }

  return (
    <div className="game-details-wrapper flex ">
      <Toast ref={toast} />
      <div className="game-details-image">
        <Image src={image} alt={game.name} preview />
        <div className="flex justify-content-end mt-2">
          <Button
            label={editing ? 'Cancel Edit' : 'Edit'}
            icon="pi pi-pencil"
            className="p-button-outlined edit-button"
            onClick={() => {
              setEditing(!editing)
            }}
          />
          <Button
            label="Delete"
            icon="pi pi-trash"
            className="p-button-outlined p-button-danger ml-3 delete-button"
            onClick={confirm}
          />
        </div>
      </div>
      {!editing && (
        <div className="game-details-fields flex-column">
          <h3>{game.name}</h3>
          <p>
            Developed by <span>{game.developer}</span>
          </p>
          <p>
            Published by <span>{game.publisher}</span>
          </p>
          <p>
            Year: <span>{game.year}</span>
          </p>
          <p>
            Genre: <span>{game.genre}</span>
          </p>
          <p>
            Played On: <span>{game.platform.name}</span>
          </p>
          <p>
            Score: <Score score={game.rating} />{' '}
          </p>
          <p>
            <Status status={game.status.name} />{' '}
          </p>
          <p>
            <h4>
              <a href={game.steam_page} target="blank">
                {' '}
                Steam Page
              </a>
            </h4>
          </p>
          {game.description && game.description !== '' && (
            <p>{game.description}</p>
          )}
        </div>
      )}
      {editing && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="game-details-edit flex flex-wrap">
            <div className="flex flex-column flex-grow-1">
              <h4>Name</h4>
              <InputText
                id="gname"
                defaultValue={game.name}
                {...register('name', { required: true })}
              />
              {errors.name && (
                <span className="error-message">Name is required</span>
              )}
              <h4>Developer</h4>
              <InputText
                id="gdev"
                defaultValue={game.developer}
                {...register('developer')}
              />
              <h4>Publisher</h4>
              <InputText
                id="gpub"
                defaultValue={game.publisher}
                {...register('publisher')}
              />
              <h4>Year</h4>
              <InputText
                id="gyear"
                defaultValue={game.year}
                {...register('year', { min: 1970, max: 2030 })}
              />
              {errors.year && (
                <span className="error-message">Requires a valid year</span>
              )}
              <h4>Genre</h4>
              <InputText
                id="ggenre"
                defaultValue={game.genre}
                {...register('genre')}
              />
              <h4>Steam Page</h4>
              <InputText
                id="gsteam"
                defaultValue={game.steam_page}
                {...register('steam_page')}
              />
            </div>
            <div className="flex flex-column flex-grow-1 ml-5">
              <h4>Platform</h4>

              <Dropdown
                value={platform}
                onChange={(e) => setPlatform(e.value)}
                options={platformList}
                optionLabel="name"
              />
              <h4>Status</h4>

              <Dropdown
                value={status}
                onChange={(e) => setStatus(e.value)}
                options={statusList}
                optionLabel="name"
              />
              <h4>Score</h4>
              <InputText
                id="grating"
                type="number"
                defaultValue={game.rating}
                {...register('rating', { min: 1, max: 10, required: true })}
              />
              <h4>Description </h4>
              <InputTextarea
                rows={5}
                autoResize
                defaultValue={game.description ? game.description : ''}
                {...register('description')}
              />
            </div>
            <div className="flex flex-column" style={{ width: '100%' }}>
              <h4>Image</h4>
              <FileUpload
                name="gameImage"
                customUpload
                uploadHandler={onupload}
                onUpload={(e) => {}}
                accept="image/*"
                chooseLabel="File"
                auto
                emptyTemplate={
                  <p className="p-m-0">
                    Drag and drop files to here to upload.
                  </p>
                }
              />
              <div className="flex justify-content-end mt-2">
                <Button
                  label="Upload"
                  type="submit"
                  icon="pi pi-upload"
                  className="p-button-outlined edit-button"
                />
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  )
}

export default EditGame
