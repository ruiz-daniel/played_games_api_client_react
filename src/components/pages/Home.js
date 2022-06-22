import React, { useEffect } from 'react'
import PlayingGames from '../utils/PlayingGames'

const Home = () => {
  useEffect(() => {
    sessionStorage.clear()
  }, [])
  return (
    <>
      <div className="home-wrapper">
        <div className="home-header">WORK IN PROGRESS. Please Login</div>
        <div className="home-playing-carousel"></div>
      </div>
    </>
  )
}

export default Home
