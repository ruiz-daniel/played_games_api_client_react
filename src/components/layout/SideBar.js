import React, { useState, useRef } from 'react'
import { Avatar } from 'primereact/avatar'
import { Dialog } from 'primereact/dialog'
import { Toast } from 'primereact/toast'

import LoginForm from '../utils/LoginForm'

import { Link, useLocation, useHistory } from 'react-router-dom'

import * as routes from '../../routes'
import api from '../../services/IApi'

import weissIcon from '../../images/KUIYU.png'

const SideBar = ({ toggleSidebar }) => {
  const location = useLocation()
  const history = useHistory()
  const toast = useRef(null)
  const [loginVisible, showLogin] = useState(false)

  const handleLogin = (username, password) => {
    api.UserApi.login({ username, password }, onLogin, handleError)
  }

  const toggleLogin = () => {
    let logged = sessionStorage.getItem('userid')

    if (logged !== null) {
      //LOGOUT
      sessionStorage.clear()
      history.push(routes.home)
      window.location.reload()
    } else {
      //LOGIN
      showLogin(true)
    }
  }
  const onLogin = (data) => {
    sessionStorage.setItem('username', data.username)
    sessionStorage.setItem('userid', data.userid)
    sessionStorage.setItem('display_name', data.display_name)
    sessionStorage.setItem('access_token', data.access_token)
    sessionStorage.setItem('premium', data.premium)
    toast.current.show({
      severity: 'success',
      summary: `Welcome ${data.display_name}`,
      life: 3000,
    })
    showLogin(false)
    history.push(routes.dashboard)
    window.location.reload()
  }
  const handleError = (error) => {
    console.log('🚀 ~ file: TopBar.js ~ line 95 ~ handleError ~ error', error)

    toast.current.show({
      severity: 'error',
      summary: 'Error with login',
      detail: error.response.data.message,
      life: 3000,
    })
  }

  return (
    <div className="flex flex-column">
      <Toast ref={toast} />
      <Dialog
        visible={loginVisible}
        showHeader={false}
        dismissableMask
        onHide={() => {
          showLogin(false)
        }}
        className="login-dialog"
      >
        <LoginForm
          onLogin={(username, password) => {
            handleLogin(username, password)
          }}
        />
      </Dialog>
      <section className="logo-section">
        <Link
          onClick={() => {
            toggleSidebar(false)
          }}
          to={routes.home}
        >
          <h2 className="logo">My Game Shelf</h2>
        </Link>
      </section>
      <section className="avatar-section">
        <div className="flex flex-column">
          <Avatar
            onClick={() => {
              if (sessionStorage.getItem('userid')) {
                history.push(routes.dashboard)
                toggleSidebar(false)
              }
            }}
            image={sessionStorage.getItem('userpfp') || weissIcon}
            shape="circle"
            size="xlarge"
          />
          <h2>
            {sessionStorage.getItem('display_name')
              ? sessionStorage.getItem('display_name')
              : 'Guest'}
          </h2>
          <h3 onClick={toggleLogin}>
            <i className="pi pi-power-off"></i>{' '}
            {sessionStorage.getItem('userid') ? 'Logout' : 'Login'}
          </h3>
        </div>
      </section>
      {sessionStorage.getItem('userid') && (
        <section className="menu-section">
          <div className="menu-item">
            <Link
              onClick={() => {
                toggleSidebar(false)
              }}
              to={routes.playedgames}
            >
              <h3
                className={
                  location.pathname.includes(routes.playedgames)
                    ? 'router-view'
                    : ''
                }
              >
                <i className="pi pi-list"></i> Played Games
              </h3>
            </Link>
          </div>
          <div className="menu-item">
            <Link
              onClick={() => {
                toggleSidebar(false)
              }}
              to={routes.uploadgame}
            >
              <h3
                className={
                  location.pathname.includes(routes.uploadgame)
                    ? 'router-view'
                    : ''
                }
              >
                <i className="pi pi-upload"></i> Upload Game
              </h3>
            </Link>
          </div>
          <div className="menu-item">
            <Link
              onClick={() => {
                toggleSidebar(false)
              }}
              to={routes.stats}
            >
              <h3
                className={
                  location.pathname.includes(routes.stats) ? 'router-view' : ''
                }
              >
                <i className="pi pi-chart-bar"></i> Stats
              </h3>
            </Link>
          </div>
          <div className="menu-item">
            <Link
              onClick={() => {
                toggleSidebar(false)
              }}
              to={routes.top10games}
            >
              <h3
                className={
                  location.pathname.includes(routes.top10games)
                    ? 'router-view'
                    : ''
                }
              >
                <i className="pi pi-star"></i> Favorite Games
              </h3>
            </Link>
          </div>
        </section>
      )}
    </div>
  )
}

export default SideBar
