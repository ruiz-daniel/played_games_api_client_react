import React, { useEffect } from 'react'

import listImage from '../../images/games_shelf_games_list.png'
import detailsImage from '../../images/games_shelf_game_details.png'
import { Link } from 'react-router-dom'
import { login as loginRoute, register as registerRoute } from '../../routes'

const Home = () => {

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
      <div className="home-header">
        <div className="home-header-text flex flex-column">
          <h1>
            Welcome to your <span>Game Shelf</span>
          </h1>
          <div className="home-header-description">
            <p>
              <Link to={loginRoute}><span>Login</span></Link> or{' '}
              <Link to={registerRoute}><span>Register</span></Link> to start organizing
              your games{' '}
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
