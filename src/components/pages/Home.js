import React, { useState, useRef, useEffect } from 'react'
import * as routes from '../../routes'

import { Dialog } from 'primereact/dialog'
import { Toast } from 'primereact/toast'

import LoginForm from '../utils/LoginForm'
import listImage from '../../images/games_shelf_games_list.png'
import detailsImage from '../../images/games_shelf_game_details.png'

import { useHistory } from 'react-router-dom'

import api from '../../services/IApi'

const Home = () => {
  const toast = useRef(null)
  const history = useHistory()
  const [loginVisible, showLogin] = useState(false)

  const handleLogin = (username, password) => {
    api.UserApi.login({ username, password }, onLogin, handleError)
  }

  const toggleLogin = () => {
    let logged = sessionStorage.getItem('userid')

    if (logged) {
      //LOGOUT
      sessionStorage.clear()
      window.location.reload()
      history.push('/')
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

  useEffect(() => {
    var sections = document.querySelectorAll('section')
    var options = {
      rootMargin: '0px',
      threshold: 0.25,
    }
    var callback = (entries) => {
      entries.forEach((entry) => {
        var target = entry.target
        if (entry.intersectionRatio >= 0.25) {
          target.classList.add('is-inview')
        } else {
          target.classList.remove('is-inview')
        }
      })
    }
    var observer = new IntersectionObserver(callback, options)
    sections.forEach((section, index) => {
      observer.observe(section)
    })
  }, [])
  return (
    <>
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
      <div className="home-header">
        <div className="home-header-text flex flex-column">
          <h1>
            Welcome to your <span>Game Shelf</span>
          </h1>
          <div className="home-header-description">
            <p>
              <span onClick={toggleLogin}>Login</span> or <span>Register</span>{' '}
              to start organizing your games{' '}
            </p>
          </div>
        </div>
      </div>
      <section className="home-section grid">
        <div className="home-section-img col-12 md:col-6">
          <img src={listImage} alt="Shelf"></img>
        </div>
        <div className="home-section-desc col-12 md:col-6">
          <h1>Organize all your games</h1>
          <h3>
            Create your games shelf with all the games you've played, finished,
            dropped. Ranked them to your liking
          </h3>
        </div>
      </section>
      <section className="home-section grid">
        <div className="home-section-img col-12 md:col-6">
          <img src={detailsImage} alt="Shelf"></img>
        </div>
        <div className="home-section-desc col-12 md:col-6">
          <h1>Add your own info</h1>
          <h3>
            When it came out, when you played it, where you played it, how long?
            Record your journey with your games
          </h3>
        </div>
      </section>
    </>
  )
}

export default Home
