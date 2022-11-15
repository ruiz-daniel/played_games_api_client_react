import React, { useState, useRef, useEffect } from 'react'

import { Card } from 'primereact/card'
import { Avatar } from 'primereact/avatar'

import PlayingGames from '../utils/PlayingGames'

import weissIcon from '../../images/KUIYU.png'

const Dashboard = () => {
  useEffect(() => {}, [])

  return (
    <>
      <div className="grid">
        <div className="p-5 col-12 md:col-6">
          <div>
            <Card style={{ width: '100%' }}>
              <div className="flex user-card">
                <Avatar
                  image={weissIcon}
                  className="mr-4"
                  size="xlarge"
                  shape="circle"
                />
                <div>
                  <h1>{sessionStorage.getItem('display_name')}</h1>
                  <h3>@{sessionStorage.getItem('username')}</h3>
                </div>
              </div>
            </Card>
            <div className="mt-2" style={{height: '45vh'}}>
              <PlayingGames />
            </div>
          </div>
        </div>
        <div
          className="p-5 col-12 md:col-6"
        ></div>
      </div>
    </>
  )
}

export default Dashboard
