import React, { useState, useRef, useEffect } from 'react'
import api from '../../services/IApi'

import { useForm, Controller } from 'react-hook-form'

import { InputText } from 'primereact/inputtext'
import { Dropdown } from 'primereact/dropdown'
import { FileUpload } from 'primereact/fileupload'
import { Button } from 'primereact/button'
import { InputTextarea } from 'primereact/inputtextarea'

import { Toast } from 'primereact/toast'

import { sr_images } from '../../routes'

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
    if (image) {
      await api.GeneralApi.uploadImage(image, sessionStorage.getItem('userid'))
    }
    
    api.PlayedGamesApi.patchPlayedGame(
      {
        id: game.id,
        name: data.name,
        developer: data.developer,
        publisher: data.publisher,
        year: data.year,
        played_year: data.played_year,
        genre: data.genre,
        played_hours: data.played_hours,
        rating: data.rating,
        platformid: data.platform.id,
        statusid: data.status.id,
        image: image ? sr_images + sessionStorage.getItem('userid') + '/' + image.name : game.image,
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
            <InputText id="gname" defaultValue={game.name} {...register('name', { required: true })} />
            {errors.name && (
              <div className="error-message">Name is required</div>
            )}
          </div>
          <div className="item flex flex-column">
            <label htmlFor="gdev">Developer</label>
            <InputText id="gdev" defaultValue={game.developer} {...register('developer')} />
          </div>
          <div className="item flex flex-column">
            <label htmlFor="gpub">Publisher</label>
            <InputText id="gpub" defaultValue={game.publisher} {...register('publisher')} />
          </div>
          <div className="item flex flex-column">
            <label htmlFor="gyear">Year</label>
            <InputText
              id="gyear"
              type="number"
              defaultValue={game.year}
              {...register('year', { min: 1970, max: 2030 })}
            />
            {errors.year && (
              <div className="error-message">Requires a valid year</div>
            )}
          </div>
          <div className="item flex flex-column">
            <label htmlFor="gplayedyear">Played Year</label>
            <InputText
              id="gplayedyear"
              type="number"
              defaultValue={game.played_year}
              {...register('played_year', { min: 1970, max: 2030 })}
            />
            {errors.played_year && (
              <div className="error-message">Requires a valid year</div>
            )}
          </div>
          <div className="item flex flex-column">
            <label htmlFor="ggenre">Genre</label>
            <InputText id="ggenre" defaultValue={game.genre} {...register('genre')} />
          </div>
          <div className="item flex flex-column">
            <label htmlFor="platform">Platform*</label>
            <Controller
              name="platform"
              defaultValue={game.platform}
              control={control}
              rules={{ required: 'Platform is required' }}
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
            {errors.platform && (
              <div className="error-message">Platform is required</div>
            )}
          </div>
          <div className="item flex flex-column">
            <label htmlFor="status">Completion*</label>
            <Controller
              name="status"
              control={control}
              defaultValue={game.status}
              rules={{ required: 'Status is required' }}
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
            {errors.status && (
              <div className="error-message">Status is required</div>
            )}
          </div>
          <div className="item flex flex-column">
            <label htmlFor="grating">Rating*</label>
            <InputText
              id="grating"
              type="number"
              defaultValue={game.rating}
              min={1}
              max={10}
              {...register('rating', { min: 1, max: 10, required: true })}
            />
            {errors.rating && (
              <div className="error-message">Requires a valid rating</div>
            )}
          </div>
          <div className="item flex flex-column">
            <label htmlFor="ghours">Played Hours</label>
            <InputText
              id="ghours"
              type="number"
              defaultValue={game.played_hours}
              min={0}
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
            <InputText id="gsteam" defaultValue={game.steam_page} {...register('steam_page')} />
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
              onRemove={() => {setImage(null)}}
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
