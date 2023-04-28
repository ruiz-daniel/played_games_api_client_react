import React, { useState, useRef } from 'react'

import { useModalsContext } from '../../hooks/contexts/useModalsContext'

import { Toolbar } from 'primereact/toolbar'
import { Avatar } from 'primereact/avatar'
import { Dialog } from 'primereact/dialog'
import { Toast } from 'primereact/toast'
import { Menu } from 'primereact/menu'
// import { Sidebar } from 'primereact/sidebar'
// import SidebarContent from './SideBar'

import { Link } from 'react-router-dom'
import * as routes from '../../routes'

import weissIcon from '../../images/KUIYU.png'

const TopBar = () => {
  const menu = useRef(null)
  const [sideMenu, toggleSideMenu] = useState(false)
  const {toggleLogin, toggleRegister} = useModalsContext()

  // var isMobile = navigator.userAgent.toLowerCase().match(/mobile/i)

  const handleLogoClick = () => {
    if (sessionStorage.getItem('userid')) {
    } else {
    }
  }

  const userMenuItems = [
    {
      label: sessionStorage.getItem('username')
        ? sessionStorage.getItem('display_name')
        : 'Guest',
    },
    {
      label: localStorage.getItem('userid') ? 'Logout' : 'Login',
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
            {/* <div className="topbar-element">
              <Link to={routes.top10games}>Favorites</Link>
            </div> */}
          </div>
        )}
      </div>
    </React.Fragment>
  )

  const rightContents = (
    <React.Fragment>
      {!sideMenu && (
        <Avatar
          image={sessionStorage.getItem('userpfp') || weissIcon}
          shape="circle"
          size="large"
          onClick={(e) => menu.current.toggle(e)}
        />
      )}
      <Menu model={userMenuItems} popup ref={menu} />
    </React.Fragment>
  )

  return (
    <div className="sticky-section">
      <Toolbar left={leftContents} right={rightContents} className="topbar" />
      {/* <Sidebar
        className="menu-sidebar"
        visible={sideMenu}
        onHide={() => toggleSideMenu(false)}
        showCloseIcon={false}
      >
        <SidebarContent toggleSidebar={toggleSideMenu} />
      </Sidebar> */}
    </div>
  )
}

export default TopBar
