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
      <div className="grid">
        <div className="p-5 col-12 md:col-8 xl:col-6">
          <div>
            <Card style={{ width: '100%' }}>
              <div className="flex relative user-card">
                <Avatar
                  image={weissIcon}
                  className="mr-4"
                  size="xlarge"
                  shape="circle"
                />
                <div>
                  <h1>{sessionStorage.getItem('display_name')}</h1>
                  <h3>@{sessionStorage.getItem('username')}</h3>
                  {userGamesInfo?.userid && (
                    <div className='flex flex-wrap'>
                      <div className="info-box" onClick={goToList}>
                        <i className="pi pi-desktop" />{' '}
                        <p>{userGamesInfo.playedgames}</p>
                      </div>
                      <div className="info-box info-box-green" onClick={goToList}>
                        <i className="pi pi-check" />{' '}
                        <p>{userGamesInfo.completedGames}</p>
                      </div>
                      <div className="info-box info-box-yellow" onClick={goToList}>
                        <i className="pi pi-clock" />{' '}
                        <p>{userGamesInfo.playingGames}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Card>
            <div className="mt-2" style={{ height: '45vh' }}>
              <Card>
                <PlayingGames />
              </Card>
              
            </div>
          </div>
        </div>
        <div className="p-5 col-12 md:col-6"></div>
      </div>
    </>
  )
}

export default Dashboard
