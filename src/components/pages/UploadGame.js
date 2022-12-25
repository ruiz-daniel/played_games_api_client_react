import React, { useState, useRef, useEffect } from 'react'
import api from '../../services/IApi'
import { useForm, Controller } from 'react-hook-form'

import { InputText } from 'primereact/inputtext'
import { Dropdown } from 'primereact/dropdown'
import { FileUpload } from 'primereact/fileupload'
import { InputTextarea } from 'primereact/inputtextarea'
import { Button } from 'primereact/button'

import { Toast } from 'primereact/toast'

var step = 0

const UploadGame = () => {
  const [platformList, setPlatformList] = useState([])
  const [statusList, setStatusList] = useState([])
  const [gameImage, setGameImage] = useState()

  const {
    register,
    handleSubmit,
    control,
    watch,
    trigger,
    clearErrors,
    formState: { errors },
  } = useForm({})
  const watchData = watch()

  const toast = useRef(null)

  const onSubmit = async (data) => {
    await api.GeneralApi.uploadImage(
      gameImage,
      sessionStorage.getItem('userid'),
    )
    api.PlayedGamesApi.postPlayedGame(
      {
        name: data.name,
        developer: data.dev ? data.dev : 'Unknown',
        publisher: data.publisher ? data.publisher : 'Unknown',
        year: data.year ? data.year : 'Unknown',
        played_year: data.played_year ? data.played_year : 'Unknown',
        genre: data.genre ? data.genre : 'Unknown',
        played_hours: data.played_hours,
        rating: data.rating,
        description: data.description,
        platformid: data.platform.id,
        statusid: data.status.id,
        steam_page: data.steam_page,
        image: gameImage ? gameImage.name : 'no-cover.jpg',
        userid: sessionStorage.getItem('userid'),
      },
      () => {
        toast.current.show({
          severity: 'success',
          summary: 'Game Uploaded Successfully',
          life: 3000,
        })
      },
    )
  }

  //FETCH PLATFORMS AND STATUSES WHEN THE COMPONENT MOUNTS
  useEffect(() => {
    step = 0
    ;(async () => {
      const response_platforms = await api.GeneralApi.fetchPlatforms()
      const platforms = await response_platforms.data
      setPlatformList(platforms)
      const response_status = await api.GeneralApi.fetchStatuses()
      const statuses = await response_status.data
      setStatusList(statuses)
    })()
  }, [])

  //SAVE THE IMAGE TO ITS STATE AFTER SELECTING IT FROM LOCAL FILES
  const onupload = async (e) => {
    setGameImage(e.files[0])
  }

  const moveStep = (direction) => {
    var section = document.getElementById('form-wrapper')
    if (direction === 'forward') {
      step++
    } else if (direction === 'backwards') {
      step--
    }
    section.setAttribute('style', `transform: translateX(-${step * 25}%)`)
  }

  //HTML CODE
  return (
    <div className="flex flex-column upload-game-wrapper">
      <Toast ref={toast} />
      <h2>Upload new game</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div id="form-wrapper">
          {/* STEP 1 */}
          <div className="upload-game-step">
            <div className="flex flex-column upload-game-form">
              <div className="item flex flex-column">
                <label htmlFor="gname">Name*</label>
                <InputText
                  id="gname"
                  {...register('name', { required: true })}
                />
                {errors.name && (
                  <div className="error-message">Name is required</div>
                )}
              </div>
              <div className="item flex flex-column">
                <label htmlFor="gdev">Developer</label>
                <InputText id="gdev" {...register('dev')} />
              </div>
              <div className="item flex flex-column">
                <label htmlFor="gpub">Publisher</label>
                <InputText id="gpub" {...register('publisher')} />
              </div>
              <div className="item flex flex-column">
                <label htmlFor="gyear">Year</label>
                <InputText
                  id="gyear"
                  type="number"
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
                  {...register('played_year', { min: 1970, max: 2030 })}
                />
                {errors.played_year && (
                  <div className="error-message">Requires a valid year</div>
                )}
              </div>

              <div className="upload-game-form-footer">
                <span
                  className="button-span form-button-right"
                  onClick={async () => {
                    const result = await trigger([
                      'name',
                      'year',
                      'played_year',
                    ])
                    if (result) {
                      clearErrors()
                      moveStep('forward')
                    }
                  }}
                >
                  Continue
                </span>
              </div>
            </div>
          </div>

          {/* STEP 2 */}
          <div className="upload-game-step">
            <div className="flex flex-column upload-game-form">
              <div className="item flex flex-column">
                <label htmlFor="ggenre">Genre</label>
                <InputText id="ggenre" {...register('genre')} />
              </div>
              <div className="item flex flex-column">
                <label htmlFor="platform">Platform*</label>
                <Controller
                  name="platform"
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
                  min={0}
                  {...register('played_hours')}
                />
                {errors.played_hours && (
                  <div className="error-message">
                    Requires a valid amount of hours
                  </div>
                )}
              </div>

              <div className="upload-game-form-footer">
                <span
                  className="button-span form-button-left"
                  onClick={async () => {
                    moveStep('backwards')
                  }}
                >
                  Back
                </span>
                <span
                  className="button-span form-button-right"
                  onClick={async () => {
                    const result = await trigger([
                      'platform',
                      'status',
                      'rating',
                    ])
                    if (result) {
                      clearErrors()
                      moveStep('forward')
                    }
                  }}
                >
                  Continue
                </span>
              </div>
            </div>
          </div>
          {/* STEP 3 */}
          <div className="upload-game-step">
            <div className="flex flex-column upload-game-form">
              <div className="item flex flex-column">
                <label htmlFor="gsteam">Steam Page URL</label>
                <InputText id="gsteam" {...register('steam_page')} />
              </div>
              <div className="item flex flex-column">
                <label htmlFor="gdesc">Description (optional)</label>
                <InputTextarea
                  id="gdesc"
                  rows={5}
                  {...register('description')}
                  autoResize
                />
              </div>
              <div className="item flex flex-column">
                <label>Cover Image</label>
                <div className="item">
                  <FileUpload
                    name="gameImage"
                    customUpload
                    auto
                    uploadHandler={onupload}
                    accept="image/*"
                    chooseLabel="File"
                    emptyTemplate={
                      <p className="p-m-0">
                        Drag and drop files to here to upload.
                      </p>
                    }
                  />
                </div>
              </div>

              <div className="upload-game-form-footer">
                <span
                  className="button-span form-button-left"
                  onClick={async () => {
                    moveStep('backwards')
                  }}
                >
                  Back
                </span>
                <span
                  className="button-span form-button-right"
                  onClick={async () => {
                    const result = await trigger([
                      'platform',
                      'status',
                      'rating',
                    ])
                    if (result) {
                      clearErrors()
                      moveStep('forward')
                    }
                  }}
                >
                  Continue
                </span>
              </div>
            </div>
          </div>
          {/* FINAL STEP */}
          <div className="upload-game-step">
            <div className="flex flex-column upload-game-form">
              <table>
                <tbody>
                  <tr>
                    <td>Name</td>
                    <td>{watchData.name || 'Not specified'}</td>
                  </tr>
                  <tr>
                    <td>Developer</td>
                    <td>{watchData.publisher || 'Not specified'}</td>
                  </tr>
                  <tr>
                    <td>Year</td>
                    <td>{watchData.year || 'Not specified'}</td>
                  </tr>
                  <tr>
                    <td>Played Year</td>
                    <td>{watchData.played_year || 'Not specified'}</td>
                  </tr>
                  <tr>
                    <td>Genre</td>
                    <td>{watchData.genre || 'Not specified'}</td>
                  </tr>
                  <tr>
                    <td>Platform</td>
                    <td>{watchData.platform?.name}</td>
                  </tr>
                  <tr>
                    <td>Completion</td>
                    <td>{watchData.status?.name}</td>
                  </tr>
                  <tr>
                    <td>Rating</td>
                    <td>{watchData.rating}</td>
                  </tr>
                  <tr>
                    <td>Played Hours</td>
                    <td>{watchData.played_hours || 'Not specified'}</td>
                  </tr>
                  <tr>
                    <td>Description</td>
                    <td>{watchData.description || 'No description'}</td>
                  </tr>
                </tbody>
              </table>
              <div className="upload-game-form-footer">
                <span
                  className="button-span form-button-left form-last-step-buton"
                  onClick={async () => {
                    moveStep('backwards')
                  }}
                >
                  Back
                </span>
                <Button
                  className="upload-button form-button-right"
                  label="Upload Game"
                  type="submit"
                ></Button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default UploadGame
