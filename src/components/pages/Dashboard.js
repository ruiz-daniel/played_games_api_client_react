import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import api from '../../services/IApi'

import { Card } from 'primereact/card'
import { Avatar } from 'primereact/avatar'

import PlayingGames from '../utils/PlayingGames'

import weissIcon from '../../images/KUIYU.png'
import * as routes from '../../routes'

const Dashboard = () => {
  const history = useHistory()
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

  const goToList = () => {
    history.push(routes.playedgames)
  }

  return (
    <>
      <div className="grid pt-8">
        <div className="dashboard-user-info flex flex-column justify-content-center align-items-start  pl-8 col-12 md:col-4">
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
