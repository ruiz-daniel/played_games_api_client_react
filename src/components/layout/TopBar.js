import React, { useState, useRef } from 'react'

import { Toolbar } from 'primereact/toolbar'
import { Avatar } from 'primereact/avatar'
import { Dialog } from 'primereact/dialog'
import { Toast } from 'primereact/toast'

import LoginForm from '../utils/LoginForm'

import { Link, useLocation } from 'react-router-dom'
import * as routes from '../../routes'
import api from '../../services/APICalls'

const TopBar = () => {
  const location = useLocation()
  const toast = useRef(null)
  const [loginVisible, showLogin] = useState(false)
  const leftContents = (
    <React.Fragment>
      <Link to={routes.home}>
        <h2 className="logo">
          {' '}
          <i className="pi pi-book"></i> My Games Shelf
        </h2>
      </Link>

      <Link to={routes.playedgames}>
        <span>
          <i className="pi pi-list"></i> Games List
        </span>
      </Link>
      <Link to={routes.uploadgame}>
        <span>
          <i className="pi pi-upload"></i> Upload Game
        </span>
      </Link>
      <Link to={routes.stats}>
        <span>
          {' '}
          <i className="pi pi-chart-bar"></i> Stats
        </span>
      </Link>
      <Link
        to={{
          pathname: routes.top10games,
          state: { top10name: 'All Time' },
        }}
      >
        <span>
          {' '}
          <i className="pi pi-star"></i> Top 10 Games
        </span>
      </Link>
      <Link
        to={{
          pathname: routes.top10characters,
          state: { top10name: 'All Time' },
        }}
      >
        <span>
          {' '}
          <i className="pi pi-star"></i> Top 10 Characters
        </span>
      </Link>
    </React.Fragment>
  )

  const rightContents = (
    <React.Fragment>
      <Avatar
        icon="pi pi-user"
        shape="circle"
        onClick={() => showLogin(true)}
      />
    </React.Fragment>
  )

  const handleLogin = (username, password) => {
    api.login({ username, password }, onLogin, handleError)
  }

  const onLogin = (data) => {
    sessionStorage.setItem('username', data.username)
    sessionStorage.setItem('userid', data.userid)
    sessionStorage.setItem('display_name', data.display_name)
    sessionStorage.setItem('access_token', data.access_token)
    toast.current.show({
      severity: 'success',
      summary: `Welcome ${data.display_name}`,
      life: 3000,
    })
    showLogin(false)
  }
  const handleError = (error) => {
    console.log(error)
    alert(error)
    showLogin(false)
  }
  return (
    location.pathname !== '/login' && (
      <div className="sticky-section">
        <Toolbar left={leftContents} right={rightContents} className="topbar" />
        <Toast ref={toast} />
        <Dialog
          visible={loginVisible}
          style={{ width: '40vw' }}
          showHeader={false}
          dismissableMask
          onHide={() => {
            showLogin(false)
          }}
        >
          <LoginForm
            onLogin={(username, password) => {
              handleLogin(username, password)
            }}
          />
        </Dialog>
      </div>
    )
  )
}

export default TopBar
