import React, { useState, useEffect } from 'react'
import api from '../../services/IApi'

import { Avatar } from 'primereact/avatar'

import PlayingGames from '../utils/PlayingGames'

import weissIcon from '../../images/KUIYU.png'

const Dashboard = () => {
  const [userGamesInfo, setUserGamesInfo] = useState()

  useEffect(() => {
    api.PlayedGamesApi.getUserGamesInfo(
      sessionStorage.getItem('userid'),
      (data) => {
        setUserGamesInfo(data)
      },
      (error) => {
        console.log(
          '🚀 ~ file: PlayedGamesList.js ~ line 56 ~ useEffect ~ error',
          error,
        )
      },
    )
  }, [])

  return (
    <>
      <div className="grid pt-4 md:pt-8">
        <div className="dashboard-user-info flex flex-column justify-content-center align-items-start  pl-4 md:pl-8 col-12 md:col-4">
          <div>
            <Avatar
              image={weissIcon}
              className="mr-4"
              size="xlarge"
              shape="circle"
            />
            <h1>{sessionStorage.getItem('display_name')}</h1>
            <h3>@{sessionStorage.getItem('username')}</h3>
          </div>

          {userGamesInfo?.userid && (
            <div className="dashboard-user-stats flex flex-column">
              <p>Total Played Games:  {userGamesInfo.playedgames}</p>

              <p>Completed Games:  {userGamesInfo.completedGames}</p>

              <p>Currently Playing Games:  {userGamesInfo.playingGames}</p>
            </div>
          )}
        </div>
        <div className="px-3 col-12 md:col-8">
          <div className="mt-2" style={{ height: '45vh' }}>
            <PlayingGames />
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard
