import "./App.css";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import PlayedGames from "./components/PlayedGamesList";
import UploadGame from "./components/UploadGame";
import PlayedGamesTable from "./components/PlayedGamesListTable";
import EditGame from "./components/EditGame";
import GameStats from "./components/GameStats";
import Top10Games from "./components/Top10Games";

import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import * as routes from "./routes";

import "primereact/resources/primereact.min.css";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 0.1,
  },
  linkButton: {
    marginLeft: theme.spacing(2),
  },
  link: {
    flexGrow: 0.1,
    color: "white",
    fontSize: 20,
  },
}));

function App() {
  const classes = useStyles();
  return (
    <Router>
      <div className="container">
        <div className="App">
          <AppBar position="static" color="secondary">
            <Toolbar>
              <Typography edge="start" className={classes.root} variant="h5">
                DRG API
              </Typography>
              <Link to={routes.home} className={classes.link}>
                List Games
              </Link>
              <Link to={routes.uploadgame} className={classes.link}>
                Upload Game
              </Link>
              <Link to={routes.stats} className={classes.link}>
                Games Stats
              </Link>
              <Link to={routes.top10games} className={classes.link}>
                Top 10 Games
              </Link>
            </Toolbar>
          </AppBar>

          <Switch>
            <Route exact path={routes.home}>
              <PlayedGames />
            </Route>
            <Route exact path={routes.playedgames}>
              <PlayedGames />
            </Route>
            <Route exact path={routes.tableview}>
              <PlayedGamesTable />
            </Route>
            <Route path={routes.uploadgame}>
              <UploadGame />
            </Route>
            <Route path={routes.editgame}>
              <EditGame />
            </Route>
            <Route path={routes.stats}>
              <GameStats />
            </Route>
            <Route path={routes.top10games}>
              <Top10Games />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
