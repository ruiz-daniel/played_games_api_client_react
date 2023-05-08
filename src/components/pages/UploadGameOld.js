import React, { useState, useRef, useEffect } from 'react'
import api from '../../services/IApi'
import { useForm, Controller } from 'react-hook-form'
import { useHistory } from 'react-router-dom'

import { InputText } from 'primereact/inputtext'
import { Dropdown } from 'primereact/dropdown'
import { FileUpload } from 'primereact/fileupload'
import { InputTextarea } from 'primereact/inputtextarea'
import { Button } from 'primereact/button'
import { Chips } from 'primereact/chips'

import { Toast } from 'primereact/toast'

import * as routes from '../../routes'
import { sr_played_games_folder, sr_images_games } from '../../routes'

var step = 0

const UploadGame = () => {
  const history = useHistory()
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
    if (gameImage) {
      await api.GeneralApi.uploadImage(
        gameImage,
        sessionStorage.getItem('username'),
        sr_played_games_folder,
      )
      data.cover =
        sr_images_games(sessionStorage.getItem('username')) + gameImage.name
    }
    api.PlayedGamesApi.postPlayedGame(data, () => {
      toast.current.show({
        severity: 'success',
        summary: 'Game Uploaded Successfully',
        life: 3000,
      })
      history.push(routes.playedgames)
    })
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

  const checkKeyDown = (e) => {
    if (e.code === 'Enter') e.preventDefault()
  }

  //HTML CODE
  return (
    <div className="flex flex-column upload-game-wrapper">
      <Toast ref={toast} />
      <h2>Upload new game</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        onKeyDown={(e) => checkKeyDown(e)}
      >
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
                <label htmlFor="gdev">Developers</label>
                <Controller
                  name="developers"
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
                <label htmlFor="gpub">Publishers</label>
                <Controller
                  name="publishers"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Chips
                      id="gpub"
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
                  {...register('release_year', { min: 1970, max: 2030 })}
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
                      'release_year',
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
                <label htmlFor="ggenre">Genres</label>
                <Controller
                  name="genres"
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
                <label htmlFor="completion">Completion*</label>
                <Controller
                  name="completion"
                  control={control}
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
                {errors.completion && (
                  <div className="error-message">Completion is required</div>
                )}
              </div>
              <div className="item flex flex-column">
                <label htmlFor="gscore">Score</label>
                <InputText
                  id="gscore"
                  type="number"
                  min={1}
                  max={10}
                  {...register('score', { min: 1, max: 10 })}
                />
                {errors.score && (
                  <div className="error-message">Requires a valid score</div>
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
                    const result = await trigger(['completion', 'score'])
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
                <label htmlFor="gepic">Epic Store Page URL</label>
                <InputText id="gepic" {...register('epic_page')} />
              </div>
              <div className="item flex flex-column">
                <label htmlFor="gstores">Other Stores URLs</label>
                <Controller
                  name="other_stores"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Chips
                      id="gstores"
                      allowDuplicate={false}
                      separator=","
                      value={field.value}
                      onChange={(e) => field.onChange(e.value)}
                    />
                  )}
                />
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
                    <td>Developers</td>
                    <td>
                      {watchData.developers?.join(',') || 'Not specified'}
                    </td>
                  </tr>
                  <tr>
                    <td>Publishers</td>
                    <td>
                      {watchData.publishers?.join(',') || 'Not specified'}
                    </td>
                  </tr>
                  <tr>
                    <td>Year</td>
                    <td>{watchData.release_year || 'Not specified'}</td>
                  </tr>
                  <tr>
                    <td>Played Year</td>
                    <td>{watchData.played_year || 'Not specified'}</td>
                  </tr>
                  <tr>
                    <td>Genres</td>
                    <td>{watchData.genres?.join(',') || 'Not specified'}</td>
                  </tr>
                  <tr>
                    <td>Tags</td>
                    <td>{watchData.tags?.join(',') || 'Not specified'}</td>
                  </tr>
                  <tr>
                    <td>Platform</td>
                    <td>{watchData.platform?.name || 'Not specified'}</td>
                  </tr>
                  <tr>
                    <td>Completion</td>
                    <td>{watchData.completion?.name || 'Not specified'}</td>
                  </tr>
                  <tr>
                    <td>Score</td>
                    <td>{watchData.score || 'Not specified'}</td>
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
                  className="button-span form-button-left"
                  onClick={async () => {
                    moveStep('backwards')
                  }}
                >
                  Back
                </span>
                <Button
                  className="button-span text-only-button form-button-right"
                  label="Finish"
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
