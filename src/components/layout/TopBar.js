import React, { useState, useRef } from 'react'

import { Toolbar } from 'primereact/toolbar'
import { Avatar } from 'primereact/avatar'
import { Dialog } from 'primereact/dialog'
import { Toast } from 'primereact/toast'
import { Menu } from 'primereact/menu'

import LoginForm from '../utils/LoginForm'

import { Link, useHistory } from 'react-router-dom'
import * as routes from '../../routes'
import api from '../../services/IApi'

const TopBar = () => {
  const history = useHistory()
  const toast = useRef(null)
  const menu = useRef(null)
  const [loginVisible, showLogin] = useState(false)

  var isMobile = navigator.userAgent.toLowerCase().match(/mobile/i),
    isTablet = navigator.userAgent.toLowerCase().match(/tablet/i),
    isAndroid = navigator.userAgent.toLowerCase().match(/android/i),
    isiPhone = navigator.userAgent.toLowerCase().match(/iphone/i),
    isiPad = navigator.userAgent.toLowerCase().match(/ipad/i)

  const handleLogin = (username, password) => {
    api.UserApi.login({ username, password }, onLogin, handleError)
  }

  const toggleLogin = () => {
    let logged = sessionStorage.getItem('userid')

    if (logged !== null) {
      //LOGOUT
      sessionStorage.clear()
      history.push('/')
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
    toast.current.show({
      severity: 'success',
      summary: `Welcome ${data.display_name}`,
      life: 3000,
    })
    showLogin(false)
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

  const userMenuItems = [
    {
      label: sessionStorage.getItem('username')
        ? sessionStorage.getItem('display_name')
        : 'Guest',
      command: () => {
        sessionStorage.getItem('username')
          ? history.push(routes.dashboard)
          : history.push(routes.home)
      },
    },
    {
      label: sessionStorage.getItem('userid') ? 'Logout' : 'Login',
      command: toggleLogin,
    },
  ]

  const leftContents = (
    <React.Fragment>
      <div className="flex">
        <h2 className="logo">My Games Shelf</h2>

        {sessionStorage.getItem('userid') && (
          <div className="flex">
            <div className="topbar-element">
              <Link to={routes.playedgames}>Games List</Link>
            </div>
            <div className="topbar-element">
              <Link to={routes.uploadgame}>Upload Game</Link>
            </div>
            <div className="topbar-element">
              <Link to={routes.stats}>Stats</Link>
            </div>
            <div className="topbar-element">
              <Link
                to={{
                  pathname: routes.top10games,
                  state: { top10name: 'All Time' },
                }}
              >
                Top 10 Games
              </Link>
            </div>
            <div className="topbar-element">
              <Link
                to={{
                  pathname: routes.top10characters,
                  state: { top10name: 'All Time' },
                }}
              >
                Top 10 Characters
              </Link>
            </div>
          </div>
        )}
      </div>
    </React.Fragment>
  )

  const rightContents = (
    <React.Fragment>
      <Avatar
        icon="pi pi-user"
        shape="circle"
        onClick={(e) => menu.current.toggle(e)}
      />
      <Menu model={userMenuItems} popup ref={menu} />
    </React.Fragment>
  )

  return (
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
}

export default TopBar
