import React, { useState, useEffect } from 'react'
import api from '../../services/IApi'

import { Avatar } from 'primereact/avatar'
import { Card } from 'primereact/card'
import { InputText } from 'primereact/inputtext'
import { FileUpload } from 'primereact/fileupload'
import { Button } from 'primereact/button'

import { useForm } from 'react-hook-form'

import { sr_played_pfp_folder, sr_images_pfp } from '../../routes'

import PlayingGames from '../utils/PlayingGames'

import weissIcon from '../../images/KUIYU.png'

const Dashboard = () => {
  const [userGamesInfo, setUserGamesInfo] = useState()
  const [user, setUser] = useState()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({})

  const onSubmit = (data) => {
    console.log(data)
    api.UserApi.updateUser({ _id: user._id, ...data }, setUser)
  }

  const onUpload = async (e) => {
    await api.GeneralApi.uploadImage(
      e.files[0],
      user.username,
      sr_played_pfp_folder,
    )
    api.UserApi.updateUser(
      {
        _id: user._id,
        profile_picture: `${sr_images_pfp(user.username)}${e.files[0].name}`,
      },
      setUser,
    )
  }

  const getUser = () => {
    api.UserApi.getUser(sessionStorage.getItem('userid'), setUser)
  }

  useEffect(() => {
    getUser()
    // api.PlayedGamesApi.getUserGamesInfo(
    //   sessionStorage.getItem('userid'),
    //   (data) => {
    //     setUserGamesInfo(data)
    //   },
    //   (error) => {
    //     console.log(
    //       '🚀 ~ file: PlayedGamesList.js ~ line 56 ~ useEffect ~ error',
    //       error,
    //     )
    //   },
    // )
  }, [])

  return (
    <>
      <div className="grid pt-4 md:pt-8">
        <div className="dashboard-user-info flex flex-column justify-content-center align-items-start  pl-4 md:pl-8 col-12 md:col-4">
          <div>
            <Avatar
              image={user?.profile_picture || weissIcon}
              className="mr-4"
              size="xlarge"
              shape="circle"
            />
            <h1>{sessionStorage.getItem('display_name')}</h1>
            <h3>@{sessionStorage.getItem('username')}</h3>
          </div>

          {userGamesInfo?.userid && (
            <div className="dashboard-user-stats flex flex-column">
              <p>Total Played Games: {userGamesInfo.playedgames}</p>

              <p>Completed Games: {userGamesInfo.completedGames}</p>

              <p>Currently Playing Games: {userGamesInfo.playingGames}</p>
            </div>
          )}
        </div>
        <div className="px-3 col-12 md:col-8">
          <div className="mt-2" style={{ height: '45vh' }}>
            <PlayingGames />
          </div>
        </div>
      </div>
      {user && (
        <div className="mt-4 pl-4 md:pl-8 dashboard-user-details">
          <Card>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="item flex flex-column">
                <label>Username</label>
                <InputText
                  defaultValue={user.username}
                  disabled
                  {...register('username')}
                />
              </div>
              <div className="item flex flex-column">
                <label>Display Name</label>
                <InputText
                  defaultValue={user.display_name}
                  {...register('display_name', { required: true })}
                />
                {errors.display_name && (
                  <div className="error-message">Display Name is required</div>
                )}
              </div>
              <div className="item flex flex-column">
                <label>Email Address</label>
                <InputText defaultValue={user.email} {...register('email')} />
              </div>
              {errors.email && (
                  <div className="error-message">Email is required</div>
                )}
              <div className="item flex flex-column">
                <label>Profile Picture</label>
                <FileUpload
                  customUpload
                  auto
                  mode="basic"
                  uploadHandler={onUpload}
                  accept="image/*"
                  chooseLabel="File"
                />
              </div>
              <div className="item flex flex-row-reverse">
                <Button label="Save Changes" type="submit" />
              </div>
            </form>
          </Card>
        </div>
      )}
    </>
  )
}

export default Dashboard
