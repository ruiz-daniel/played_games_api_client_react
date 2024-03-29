import React from 'react'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import 'primereact/resources/themes/saga-blue/theme.css'
import 'primeflex/primeflex.css'

import TopBar from './components/layout/TopBar'
import PlayedGames from './components/pages/PlayedGamesList'
import UploadGame from './components/pages/UploadGame'
import GameDetails from './components/pages/GameDetails'
import GameStats from './components/pages/GameStats'
import Home from './components/pages/Home'
import Dashboard from './components/pages/Dashboard'
import Login from './components/pages/Login'
import SignUp from './components/pages/SignUp'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import * as routes from './routes'
import './styles/main.scss'

import 'nprogress/nprogress.css'

import { UserProvider } from './contexts/user'
import { MessagesProvider } from './contexts/messages'
import { LoadingProvider } from './contexts/loading'

function App() {
  return (
    <Router>
      <LoadingProvider>
        <MessagesProvider>
          <UserProvider>
            <TopBar />
            <div className="content-container">
              {
                <Routes>
                  <Route path={routes.home} element={<Home />} />
                  <Route path={routes.dashboard} element={<Dashboard />} />
                  <Route path={routes.login} element={<Login />} />
                  <Route path={routes.register} element={<SignUp />} />
                  <Route path={routes.playedgames} element={<PlayedGames />} />
                  <Route path={routes.stats} element={<GameStats />} />
                  <Route path={routes.gamedetails} element={<GameDetails />} />
                  <Route path={routes.uploadgame} element={<UploadGame />} />
                </Routes>
              }
            </div>
          </UserProvider>
        </MessagesProvider>
      </LoadingProvider>
    </Router>
  );
}

export default App
