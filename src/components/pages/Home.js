import React, { useState, useRef, useEffect } from 'react'
import * as routes from '../../routes'
import { ScrollPanel } from 'primereact/scrollpanel'

import { Dialog } from 'primereact/dialog'
import { Toast } from 'primereact/toast'
import { Card } from 'primereact/card'

import LoginForm from '../utils/LoginForm'
import shelfImage from '../../images/empty shelf background.png'

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
    sessionStorage.setItem('premium', data.premium)
    toast.current.show({
      severity: 'success',
      summary: `Welcome ${data.display_name}`,
      life: 3000,
    })
    showLogin(false)
    history.push(
      routes.playedgames,
    )
    // window.location.reload()
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
      <ScrollPanel style={{ width: '100%', height: '100vh' }}>
        <div className="home-header">
          <div className="home-header-text flex flex-column">
            <h1>
              Welcome to your <span>Games Shelf</span>
            </h1>
            <div className="home-header-description">
              <p>
                <span onClick={toggleLogin}>Login</span> or{' '}
                <span>Register</span> to start organizing your games{' '}
              </p>
            </div>
          </div>
        </div>
        <h1 className='text-center'>What can I do here?</h1>
        <h1 className='text-center'><i className='pi pi-arrow-down '></i></h1>
        <section className="home-section grid">
          <div className="home-section-img col-6">
            <img src={shelfImage} alt="Shelf"></img>
          </div>
          <div className="home-section-desc col-6">
            <h1>Organize all your games</h1>
          </div>
        </section>
        <section className="home-section grid">
          <div className="home-section-img col-6">
            <img src={shelfImage} alt="Shelf"></img>
          </div>
          <div className="home-section-desc col-6">
            <h1>Organize all your games</h1>
          </div>
        </section>
      </ScrollPanel>
      {/* <div className="home-wrapper">
        <div className="home-header">WORK IN PROGRESS. Please Login</div>
        <div className="welcome-panel">
          <Card>
            <div className='grid'>
              <div className='col-6 text-center'>
                <section>
                  <h1>Welcome to your <span>Games Shelf</span></h1>
                </section>
              </div>
              <div className='col-6'>
                <img src={welcomeImg} alt="Shelf"></img>
              </div>
            </div>
          </Card>
        </div>
        <div className="home-playing-carousel"></div>
      </div> */}
    </>
  )
}

export default Home
