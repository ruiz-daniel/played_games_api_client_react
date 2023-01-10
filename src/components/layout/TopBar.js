import React, { useState, useRef } from 'react'

import { Toolbar } from 'primereact/toolbar'
import { Avatar } from 'primereact/avatar'
import { Dialog } from 'primereact/dialog'
import { Toast } from 'primereact/toast'
import { Menu } from 'primereact/menu'
import { Sidebar } from 'primereact/sidebar'
import SidebarContent from './SideBar'

import LoginForm from '../utils/LoginForm'

import { Link, useHistory } from 'react-router-dom'
import * as routes from '../../routes'
import api from '../../services/IApi'

import weissIcon from '../../images/KUIYU.png'

const TopBar = () => {
  const history = useHistory()
  const toast = useRef(null)
  const menu = useRef(null)
  const [loginVisible, showLogin] = useState(false)
  const [sideMenu, toggleSideMenu] = useState(false)

  // var isMobile = navigator.userAgent.toLowerCase().match(/mobile/i)

  const handleLogin = (username, password) => {
    api.UserApi.login({ username, password }, onLogin, handleError)
  }

  const toggleLogin = () => {
    let logged = sessionStorage.getItem('userid')

    if (logged !== null) {
      //LOGOUT
      sessionStorage.clear()
      history.push('/')
      window.location.reload()
    } else {
      //LOGIN
      showLogin(true)
    }
  }

  const onLogin = (data) => {
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

  const handleLogoClick = () => {
    if (sessionStorage.getItem('userid')) {
      history.push(routes.dashboard)
    } else {
      history.push(routes.home)
    }
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
        {
          <div
            className="topbar-element sidemenu-icon mr-4"
            onClick={() => toggleSideMenu(true)}
          >
            <i className="pi pi-bars" />
          </div>
        }
        <h2 className="logo" onClick={handleLogoClick}>
          My Game Shelf
        </h2>

        {sessionStorage.getItem('userid') && (
          <div className="flex topbar-links">
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
      {!sideMenu && <Avatar
        image={weissIcon}
        shape="circle"
        size="large"
        onClick={(e) => menu.current.toggle(e)}
      />}
      <Menu model={userMenuItems} popup ref={menu} />
    </React.Fragment>
  )

  return (
    <div className="sticky-section">
      <Toolbar left={leftContents} right={rightContents} className="topbar" />
      <Toast ref={toast} />
      <Dialog
        visible={loginVisible}
        className="login-dialog"
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
      <Sidebar
        className="menu-sidebar"
        visible={sideMenu}
        onHide={() => toggleSideMenu(false)}
        showCloseIcon={false}
      >
        <SidebarContent toggleSidebar={toggleSideMenu} />
      </Sidebar>
    </div>
  )
}

export default TopBar
