import React from "react";
import "./App.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primereact/resources/themes/saga-blue/theme.css";
import "primeflex/primeflex.css";

import TopBar from "./components/layout/TopBar";
import PlayedGames from "./components/PlayedGamesList";
// import UploadGame from "./components/UploadGame";
// import EditGame from "./components/EditGame";
import GameStats from "./components/GameStats";
// import Top10Games from "./components/Top10Games";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import * as routes from "./routes";
import "./styles/main.scss";

import "nprogress/nprogress.css";

function App() {
  return (
    <Router>
      <TopBar></TopBar>
      {
        <Switch>
          <Route exact path={routes.home}>
            <PlayedGames />
          </Route>
          <Route exact path={routes.playedgames}>
            <PlayedGames />
          </Route>
          {/* <Route path={routes.uploadgame}>
            <UploadGame />
          </Route>
          <Route path={routes.editgame}>
            <EditGame />
          </Route> */}
          <Route path={routes.stats}>
            <GameStats />
          </Route>
          {/* <Route path={routes.top10games}>
            <Top10Games />
          </Route> */}
        </Switch>
      }
    </Router>
  );
}

export default App;
