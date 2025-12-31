import React, { useState, useRef, useEffect } from 'react'
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

  const { user, logout, getUserData } = useUser()

  useEffect(() => {
    getUserData()
  }, [])

  // var isMobile = navigator.userAgent.toLowerCase().match(/mobile/i)

  const goToDashboard = () => {
    user?._id &&  navigator.goToDashboard()
  }
  const handleLoginOrOut = () => {
    user?._id ? logout() : navigator.goToLogin()
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
            // onClick={() => toggleSideMenu(true)}
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
            <div className="topbar-element">
              <Link to={routes.singleLists}>Lists</Link>
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
    <div className='sticky top-0 z-1 bg-white px-1 py-3 flex items-center w-full shadow'>
      {user?._id && <div className='flex gap-3 flex-1'>
        <div
          className="p-3 cursor-pointer"
          onClick={() => toggleSideMenu(true)}
        >
          <i className="pi pi-bars" />
        </div>
        <div className='p-3 rounded-md bg-amber-300 w-[82px] flex justify-center'>
          <Link to={routes.playedgames}>Games</Link>
        </div>
        <div className='p-3 rounded-md bg-amber-300 w-[82px] flex justify-center'>
          <Link to={routes.uploadgame}>Upload</Link>
        </div>
        <div className='p-3 rounded-md bg-amber-300 w-[82px] flex justify-center'>
          <Link to={routes.stats}>Stats</Link>
        </div>
        <div className='p-3 rounded-md bg-amber-300 w-[82px] flex justify-center'>
          <Link to={routes.singleLists}>Lists</Link>
        </div>
      </div>}
      {!user?._id &&<div className='flex gap-3 flex-1 items-center'>
        <div
          className="p-3 cursor-pointer"
          onClick={() => toggleSideMenu(true)}
        >
          <i className="pi pi-bars" />
        </div>
        <h1 className="font-serif font-bold text-4xl text-amber-700">VG Shelf</h1>
      </div>}
      <div className='mr-3'>
        {!sideMenu && (
          user?._id ? <img width={60} height={60} className='rounded-full cursor-pointer' src={user?.profile_picture} onClick={(e) => menu.current.toggle(e)} />
          : <div className='bg-gray-200 p-3 rounded-full cursor-pointer'>
            <i className='pi pi-user' onClick={(e) => menu.current.toggle(e)}  />
          </div>
        )}
        <Menu model={userMenuItems} popup ref={menu} className='right-12 left-auto! shadow-2xl w-28 flex flex-col items-center transition-all' />
      </div>
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
