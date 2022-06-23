import React, { useState, useRef } from 'react'
import api from '../../services/APICalls'
import { useForm, Controller } from 'react-hook-form'

import { InputText } from 'primereact/inputtext'
import { Dropdown } from 'primereact/dropdown'
import { FileUpload } from 'primereact/fileupload'
import { Panel } from 'primereact/panel'
import { InputTextarea } from 'primereact/inputtextarea'
import { Button } from 'primereact/button'

import { Toast } from 'primereact/toast'
import { Steps } from 'primereact/steps'

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
    await api.uploadImage(gameImage)
    api.postPlayedGame(
      {
        name: data.name,
        developer: data.dev ? data.dev : 'Unknown',
        publisher: data.publisher ? data.publisher : 'Unknown',
        year: data.year ? data.year : 'Unknown',
        genre: data.genre ? data.genre : 'Unknown',
        rating: data.rating,
        description: data.description,
        platformid: data.platform.id,
        statusid: data.status.id,
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
  React.useEffect(() => {
    ;(async () => {
      const response_platforms = await api.fetchPlatforms()
      const platforms = await response_platforms.data
      setPlatformList(platforms)
      const response_status = await api.fetchStatuses()
      const statuses = await response_status.data
      setStatusList(statuses)
    })()
  }, [])

  //SAVE THE IMAGE TO ITS STATE AFTER SELECTING IT FROM LOCAL FILES
  const onupload = async (e) => {
    setGameImage(e.files[0])
  }

  //STEPS ITEMS
  const step_items = [
    { label: 'Info' },
    { label: 'Played' },
    { label: 'Cover' },
    { label: 'Finish' },
  ]
  const [activeIndex, setActiveIndex] = useState(0)

  //HTML CODE
  return (
    <Panel header="New Game" className="upload-game-form">
      <Toast ref={toast} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="upload-game-fields">
          <Steps
            model={step_items}
            activeIndex={activeIndex}
            onSelect={(e) => setActiveIndex(e.index)}
            style={{ width: '100%' }}
          />

          {activeIndex === 0 && (
            <div className="form-content justify-content-center">
              <span className="item flex flex-column">
                <label htmlFor="gname">Name*</label>
                <InputText
                  id="gname"
                  {...register('name', { required: true })}
                />
                {errors.name && (
                  <span className="error-message">Name is required</span>
                )}
              </span>

              <span className="item flex flex-column">
                <label htmlFor="gdev">Developer</label>
                <InputText id="gdev" {...register('dev')} />
              </span>

              <span className="item flex flex-column">
                <label htmlFor="gpub">Publisher</label>
                <InputText id="gpub" {...register('publisher')} />
              </span>

              <span className="item flex flex-column">
                <label htmlFor="gyear">Year</label>
                <InputText
                  id="gyear"
                  type="number"
                  {...register('year', { min: 1970, max: 2030 })}
                />
                {errors.year && (
                  <span className="error-message">Requires a valid year</span>
                )}
              </span>

              <span className="item flex flex-column">
                <label htmlFor="ggenre">Genre</label>
                <InputText id="ggenre" {...register('genre')} />
              </span>

              <span className="flex">
                <Button
                  label="Continue"
                  icon="pi pi-angle-right"
                  iconPos="right"
                  onClick={async () => {
                    const result = await trigger(['name', 'year'])
                    if (result) {
                      setActiveIndex(activeIndex + 1)
                      clearErrors()
                    }
                  }}
                />
              </span>
            </div>
          )}

          {activeIndex === 1 && (
            <div className="form-content justify-content-center">
              <span className="item flex flex-column">
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
              </span>

              <span className="item flex flex-column">
                <label htmlFor="status">Status*</label>
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
              </span>

              <span className="item flex flex-column">
                <label htmlFor="grating">Rating*</label>
                <InputText
                  id="grating"
                  type="number"
                  {...register('rating', { min: 1, max: 10, required: true })}
                />
                {errors.rating && (
                  <div className="error-message">Requires a valid rating</div>
                )}
              </span>

              <span className="item flex flex-column">
                <label htmlFor="gdesc">Description (optional)</label>
                <InputTextarea
                  id="gdesc"
                  rows={5}
                  {...register('description')}
                  autoResize
                />
              </span>

              <span className="flex">
                <Button
                  label="Back"
                  icon="pi pi-angle-left"
                  iconPos="right"
                  onClick={() => {
                    setActiveIndex(activeIndex - 1)
                  }}
                />
                <Button
                  label="Continue"
                  icon="pi pi-angle-right"
                  iconPos="right"
                  onClick={async () => {
                    const result = await trigger([
                      'platform',
                      'status',
                      'rating',
                    ])
                    if (result) {
                      setActiveIndex(activeIndex + 1)
                      clearErrors()
                    }
                  }}
                />
              </span>
            </div>
          )}

          {activeIndex === 2 && (
            <div className="form-content justify-content-center">
              <h3>Cover Image</h3>
              <span className="item">
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
              </span>

              <span className="flex">
                <Button
                  label="Back"
                  icon="pi pi-angle-left"
                  iconPos="right"
                  onClick={() => {
                    setActiveIndex(activeIndex - 1)
                  }}
                />
                <Button
                  label="Continue"
                  icon="pi pi-angle-right"
                  iconPos="right"
                  onClick={() => {
                    setActiveIndex(activeIndex + 1)
                  }}
                />
              </span>
            </div>
          )}

          {activeIndex === 3 && (
            <>
              <div className="form-content flex">
                <div className="flex flex-grow-1 flex-column">
                  <div className="flex">
                    <p className="watch-data-item">Name</p>
                    <p className="watch-data-item">{watchData.name}</p>
                  </div>
                  <div className="flex">
                    <p className="watch-data-item">Developer</p>
                    <p className="watch-data-item">
                      {watchData.dev || 'Not specified'}
                    </p>
                  </div>
                  <div className="flex">
                    <p className="watch-data-item">Publisher</p>
                    <p className="watch-data-item">
                      {watchData.publisher || 'Not specified'}
                    </p>
                  </div>
                  <div className="flex">
                    <p className="watch-data-item">Year</p>
                    <p className="watch-data-item">
                      {watchData.year || 'Not specified'}
                    </p>
                  </div>
                  <div className="flex">
                    <p className="watch-data-item">Genre</p>
                    <p className="watch-data-item">
                      {watchData.genre || 'Not specified'}
                    </p>
                  </div>
                </div>
                <div className="flex flex-grow-1 flex-column">
                  <div className="flex">
                    <p className="watch-data-item">Platform</p>
                    <p className="watch-data-item">{watchData.platform.name}</p>
                  </div>
                  <div className="flex">
                    <p className="watch-data-item">Status</p>
                    <p className="watch-data-item">{watchData.status.name}</p>
                  </div>
                  <div className="flex">
                    <p className="watch-data-item">Rating</p>
                    <p className="watch-data-item">{watchData.rating}</p>
                  </div>
                  <div className="flex">
                    <p className="watch-data-item">Description</p>
                    <p className="watch-data-item">
                      {watchData.description || 'No description'}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex justify-content-end upload-button-span">
                <Button
                  label="Back"
                  icon="pi pi-angle-left"
                  iconPos="right"
                  onClick={() => {
                    setActiveIndex(activeIndex - 1)
                  }}
                />
                <Button
                  className="upload-button"
                  label="Upload Game"
                  type="submit"
                ></Button>
              </div>
            </>
          )}
        </div>
      </form>
    </Panel>
  )
}

export default UploadGame
