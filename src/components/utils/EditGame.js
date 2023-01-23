import React, { useState, useRef, useEffect } from 'react'
import api from '../../services/IApi'

import { useForm, Controller } from 'react-hook-form'

import { InputText } from 'primereact/inputtext'
import { Dropdown } from 'primereact/dropdown'
import { FileUpload } from 'primereact/fileupload'
import { Button } from 'primereact/button'
import { InputTextarea } from 'primereact/inputtextarea'
import { Chips } from 'primereact/chips'

import { Toast } from 'primereact/toast'

import { sr_played_games_folder, sr_images_games } from '../../routes'

const EditGame = ({ game, callback }) => {
  const toast = useRef(null)
  const [image, setImage] = useState()
  const [platformList, setPlatformList] = useState([])
  const [statusList, setStatusList] = useState([])
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({})

  const onSubmit = async (data) => {
    let cover = undefined
    if (image) {
      await api.GeneralApi.uploadImage(image, sessionStorage.getItem('username'), sr_played_games_folder)
      cover = sr_images_games(sessionStorage.getItem('username')) + image.name
    }

    api.PlayedGamesApi.patchPlayedGame(
      {
        _id: game._id,
        cover,
        ...data,
      },
      () => {
        toast.current.show({
          severity: 'success',
          summary: 'Game Uploaded Successfully',
          life: 3000,
        })
        callback()
      },
    )
  }

  const onupload = async (e) => {
    setImage(e.files[0])
  }

  //FETCH PLATFORMS AND STATUSES WHEN THE COMPONENT MOUNTS
  useEffect(() => {
    ;(async () => {
      const response_platforms = await api.GeneralApi.fetchPlatforms()
      const platforms = await response_platforms.data
      setPlatformList(platforms)
      const response_status = await api.GeneralApi.fetchStatuses()
      const statuses = await response_status.data
      setStatusList(statuses)
    })()
  }, [])

  return (
    <div style={{ width: '100%' }}>
      <Toast ref={toast} />

      <form onSubmit={handleSubmit(onSubmit)}>
        <div
          className="flex flex-column edit-game-form"
          style={{ width: '100%' }}
        >
          <h2>Edit Game</h2>
          <div className="item flex flex-column">
            <label htmlFor="gname">Name*</label>
            <InputText
              id="gname"
              defaultValue={game.name}
              {...register('name', { required: true })}
            />
            {errors.name && (
              <div className="error-message">Name is required</div>
            )}
          </div>
          <div className="item flex flex-column">
            <label htmlFor="gdev">Developers</label>
            <Controller
              name="developers"
              defaultValue={game.developers || []}
              control={control}
              render={({ field, fieldState }) => (
                <Chips
                  id="gdev"
                  allowDuplicate={false}
                  separator=","
                  value={field.value}
                  onChange={(e) => field.onChange(e.value)}
                />
              )}
            />
          </div>
          <div className="item flex flex-column">
            <label htmlFor="gpub">Publisher</label>
            <Controller
              name="publishers"
              defaultValue={game.publishers || []}
              control={control}
              render={({ field, fieldState }) => (
                <Chips
                  id="gdev"
                  allowDuplicate={false}
                  separator=","
                  value={field.value}
                  onChange={(e) => field.onChange(e.value)}
                />
              )}
            />
          </div>
          <div className="item flex flex-column">
            <label htmlFor="gyear">Release Year</label>
            <InputText
              id="gyear"
              type="number"
              onWheel={(e) => {e.target.blur()}}
              defaultValue={game.release_year}
              {...register('release_year', { min: 1970, max: 2030 })}
            />
            {errors.release_year && (
              <div className="error-message">Requires a valid year</div>
            )}
          </div>
          <div className="item flex flex-column">
            <label htmlFor="gplayedyear">Played Year</label>
            <InputText
              id="gplayedyear"
              type="number"
              onWheel={(e) => {e.target.blur()}}
              defaultValue={game.played_year}
              {...register('played_year', { min: 1970, max: 2030 })}
            />
            {errors.played_year && (
              <div className="error-message">Requires a valid year</div>
            )}
          </div>
          <div className="item flex flex-column">
            <label htmlFor="ggenre">Genres</label>
            <Controller
              name="genres"
              defaultValue={game.genres || []}
              control={control}
              render={({ field, fieldState }) => (
                <Chips
                  id="gdev"
                  allowDuplicate={false}
                  separator=","
                  value={field.value}
                  onChange={(e) => field.onChange(e.value)}
                />
              )}
            />
          </div>
          <div className="item flex flex-column">
            <label htmlFor="gtags">Tags</label>
            <Controller
              name="tags"
              defaultValue={game.tags || []}
              control={control}
              render={({ field, fieldState }) => (
                <Chips
                  id="gtags"
                  allowDuplicate={false}
                  separator=","
                  value={field.value}
                  onChange={(e) => field.onChange(e.value)}
                />
              )}
            />
          </div>
          <div className="item flex flex-column">
            <label htmlFor="platform">Platform</label>
            <Controller
              name="platform"
              defaultValue={game.platform}
              control={control}
              render={({ field, fieldState }) => (
                <Dropdown
                  id={field.name}
                  value={field.value}
                  onChange={(e) => field.onChange(e.value)}
                  options={platformList}
                  optionLabel="name"
                />
              )}
            />
          </div>
          <div className="item flex flex-column">
            <label htmlFor="status">Completion*</label>
            <Controller
              name="completion"
              control={control}
              defaultValue={game.completion}
              rules={{ required: 'Completion is required' }}
              render={({ field, fieldState }) => (
                <Dropdown
                  id={field.name}
                  value={field.value}
                  onChange={(e) => field.onChange(e.value)}
                  options={statusList}
                  optionLabel="name"
                />
              )}
            />
          </div>
          <div className="item flex flex-column">
            <label htmlFor="grating">Score</label>
            <InputText
              id="grating"
              type="number"
              onWheel={(e) => {e.target.blur()}}
              defaultValue={game.score}
              min={1}
              max={10}
              {...register('score', { min: 1, max: 10 })}
            />
            {errors.rating && (
              <div className="error-message">Requires a valid score</div>
            )}
          </div>
          <div className="item flex flex-column">
            <label htmlFor="ghours">Played Hours</label>
            <InputText
              id="ghours"
              type="number"
              defaultValue={game.played_hours}
              min={0}
              onWheel={(e) => {e.target.blur()}}
              {...register('played_hours')}
            />
            {errors.played_hours && (
              <div className="error-message">
                Requires a valid amount of hours
              </div>
            )}
          </div>
          <div className="item flex flex-column">
            <label htmlFor="gsteam">Steam Page URL</label>
            <InputText
              id="gsteam"
              defaultValue={game.steam_page}
              {...register('steam_page')}
            />
          </div>
          <div className="item flex flex-column">
            <label htmlFor="gepic">Epic Store Page URL</label>
            <InputText
              id="gepic"
              defaultValue={game.epic_page}
              {...register('epic_page')}
            />
          </div>
          <div className="item flex flex-column">
            <label htmlFor="gdesc">Description (optional)</label>
            <InputTextarea
              id="gdesc"
              defaultValue={game.description}
              rows={5}
              {...register('description')}
              autoResize
            />
          </div>
          <div className="item flex flex-column">
            <h4>Cover Image</h4>
            <FileUpload
              name="gameImage"
              customUpload
              uploadHandler={onupload}
              accept="image/*"
              chooseLabel="File"
              auto
              onRemove={() => {
                setImage(null)
              }}
              emptyTemplate={
                <p className="p-m-0">Drag and drop files to here to upload.</p>
              }
            />
          </div>

          <div className="flex justify-content-end mt-2">
            <Button
              label="Upload"
              type="submit"
              icon="pi pi-upload"
              className="p-button-outlined edit-button"
            />
          </div>
        </div>
      </form>
    </div>
  )
}

export default EditGame
