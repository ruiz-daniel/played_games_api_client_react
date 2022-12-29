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
import Top10Games from './components/pages/Top10Games'
import Top10Characters from './components/pages/Top10Characters'
import Home from './components/pages/Home'
import Dashboard from './components/pages/Dashboard'

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import * as routes from './routes'
import './styles/main.scss'

import 'nprogress/nprogress.css'

function App() {
  // const checkLoggedInRoutes = () => {
  //   return routes.loggedRoutes.some(route => window.location.href.includes(route))
  // }
  return (
    <Router>
        <TopBar></TopBar>
        <div className="content-container">
          {
            <Switch>
              <Route exact path={routes.home}>
                <Home />
              </Route>
              <Route exact path={routes.dashboard}>
                <Dashboard />
              </Route>
              <Route exact path={routes.playedgames}>
                <PlayedGames />
              </Route>
              <Route path={routes.uploadgame}>
                <UploadGame />
              </Route>
              <Route path={routes.gamedetails}>
                <GameDetails />
              </Route>
              <Route path={routes.stats}>
                <GameStats />
              </Route>
              <Route path={routes.top10games}>
                <Top10Games />
              </Route>
              <Route path={routes.top10characters}>
                <Top10Characters />
              </Route>
            </Switch>
          }
        </div>
    </Router>
  )
}

export default App
