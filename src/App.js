import "./App.css";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import PlayedGames from "./components/PlayedGamesList";
import UploadGame from "./components/UploadGame";
import PlayedGamesTable from "./components/PlayedGamesListTable";

import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

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
              <Link to="/" className={classes.link}>
                List Games
              </Link>
              <Link to="/uploadGame" className={classes.link}>
                Upload Game
              </Link>
            </Toolbar>
          </AppBar>

          <Switch>
            <Route exact path="/">
              <PlayedGames />
            </Route>
            <Route exact path="/tableview">
              <PlayedGamesTable />
            </Route>
            <Route path="/uploadGame">
              <UploadGame />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
