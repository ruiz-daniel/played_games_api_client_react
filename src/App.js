import React from 'react'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import 'primereact/resources/themes/saga-blue/theme.css'
import 'primeflex/primeflex.css'

import TopBar from './components/layout/TopBar'
// import PlayedGames from './components/pages/PlayedGamesList'
// import UploadGame from './components/pages/UploadGame'
// import GameDetails from './components/pages/GameDetails'
// import GameStats from './components/pages/GameStats'
// import FavoriteGames from './components/pages/FavoriteGames'
import Home from './components/pages/Home'
import Dashboard from './components/pages/Dashboard'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import * as routes from './routes'
import './styles/main.scss'

import 'nprogress/nprogress.css'

import { UserProvider } from './contexts/user'
import { ModalsProvider } from './contexts/modals'

function App() {
  return (
    <UserProvider>
      <ModalsProvider>
        <Router>
          <TopBar></TopBar>
          <div className="content-container">
            {
              <Routes>
                <Route path={routes.home} element={<Home />} />
                <Route path={routes.dashboard} element={<Dashboard />} />
              </Routes>
            }
          </div>
        </Router>
      </ModalsProvider>
    </UserProvider>
  )
}

export default App
