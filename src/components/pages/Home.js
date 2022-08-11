import React, { useEffect } from 'react'

import welcomeImg from '../../images/empty shelf background.png'

import { Card } from 'primereact/card'

const Home = () => {
  return (
    <>
      <div className="home-wrapper">
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
      </div>
    </>
  )
}

export default Home
