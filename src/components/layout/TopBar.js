import React, { useState, useRef } from 'react'
import { useNavigation } from '../../hooks/useNavigation'
import { useUser } from '../../hooks/useUser'

import { Toolbar } from 'primereact/toolbar'
import { Avatar } from 'primereact/avatar'
import { Menu } from 'primereact/menu'
import { Sidebar } from 'primereact/sidebar'
import {Sidebar as GSidebar, SidebarContent, SidebarHeader, SidebarLink, SidebarItem} from './SideBar'

import { Link } from 'react-router-dom'
import * as routes from '../../routes'

import weissIcon from '../../images/KUIYU.png'
import UserCard from '../utils/cards/UserCard'

const TopBar = () => {
  const menu = useRef(null)
  const navigator = useNavigation()
  const [sideMenu, toggleSideMenu] = useState(false)

  const { user, logout } = useUser()

  // var isMobile = navigator.userAgent.toLowerCase().match(/mobile/i)

  const goToDashboard = () => {
    user?._id &&  navigator.goToDashboard()
  }
  const handleLoginOrOut = () => {
    user?._id ? logout(() => {
      toggleSideMenu(false)
      navigator.goHome()
    }) : navigator.goToLogin()
  }

  const userMenuItems = [
    {
      label: user?.display_name ?? 'Guest',
      command: goToDashboard
    },
    {
      label: user?._id ? 'Logout' : 'Login',
      command: handleLoginOrOut
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
        <h2 className="logo">
          My Game Shelf
        </h2>

        {user?._id && (
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
          </div>
        )}
      </div>
    </React.Fragment>
  )

  const rightContents = (
    <React.Fragment>
      {!sideMenu && (
        <Avatar
          image={user?.profile_picture || weissIcon}
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
      <Sidebar
        className="menu-sidebar"
        visible={sideMenu}
        onHide={() => toggleSideMenu(false)}
        showCloseIcon={false}
      >
        <GSidebar>
          <SidebarHeader className={"flex flex-column gap-3"}>
           <section className="logo-section">
              <SidebarItem
                onClick={() => {
                  toggleSideMenu(false)
                }}
              >
                <h2 className="logo">My Game Shelf</h2>
              </SidebarItem>
          </section>
          <section>
            <UserCard user={user} />
          </section>
          </SidebarHeader>
          {user?._id && 
            <SidebarContent className="menu-section">
              <SidebarLink linkTo={routes.playedgames} onClick={e => toggleSideMenu(false)} >
                <i className="pi pi-list"></i> Played Games
              </SidebarLink>
              <SidebarLink linkTo={routes.uploadgame} onClick={e => toggleSideMenu(false)} >
                <i className="pi pi-upload"></i> Upload Games
              </SidebarLink>
              <SidebarLink linkTo={routes.stats} onClick={e => toggleSideMenu(false)} >
              <i className="pi pi-chart-bar"></i> Stats
              </SidebarLink>
            </SidebarContent>}
        </GSidebar>
      </Sidebar>
    </div>
  )
}

export default TopBar
