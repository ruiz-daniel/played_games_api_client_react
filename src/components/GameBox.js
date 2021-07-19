import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import * as routes from "../routes";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    maxWidth: 280,
  },
});

const GameBox = (props) => {
  const history = useHistory();
  const editEvent = () => {
    history.push({
      pathname: routes.editgame,
      state: {
        // location state
        game: props.game,
      },
    });
  };
  const classes = useStyles();
  return (
    <div>
      <Card className={classes.root}>
        <CardActionArea onClick={editEvent}>
          <CardMedia
            component="img"
            alt="Game Image"
            height="150"
            image={props.game.image}
            title={props.game.name}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {props.game.name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Developed by: {props.game.developer} <br />
              Published by: {props.game.publisher}
              <br />
              Year: {props.game.year} <br />
              Genre: {props.game.genre} <br />
              Platform: {props.game.platform.name}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Typography variant="h6">Score: {props.game.rating}</Typography>
          <Typography variant="h6">Status: {props.game.status.name}</Typography>
        </CardActions>
      </Card>
    </div>
  );
};

export default GameBox;
