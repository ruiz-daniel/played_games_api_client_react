import React from 'react'
import { Avatar } from 'primereact/avatar'

import { Link, useLocation } from 'react-router-dom'

import * as routes from '../../routes'

import weissIcon from '../../images/KUIYU.png'

const SideBar = ({ toggleSidebar, user, goToDashboard, handleLogInOrOut }) => {
  const location = useLocation()

  const handleAvatarClick = () => {
    toggleSidebar(false)
    goToDashboard()
  }
  const handleLogButtonClick = () => {
    toggleSidebar(false)
    handleLogInOrOut()
  }

  return (
    <div className="flex flex-column">
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
            onClick={handleAvatarClick}
            image={user?.profile_picture || weissIcon}
            shape="circle"
            size="xlarge"
          />
          <h2>
            {user?.display_name ?? 'Guest'}
          </h2>
          <h3 onClick={handleLogButtonClick}>
            <i className="pi pi-power-off"></i>{' '}
            {user?._id ? 'Logout' : 'Login'}
          </h3>
        </div>
      </section>
      {user?._id && (
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
        </section>
      )}
    </div>
  )
}

export default SideBar
