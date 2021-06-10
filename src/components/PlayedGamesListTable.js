import React, { useState, useEffect } from "react";
import api from "../services/APICalls";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import AppsIcon from "@material-ui/icons/Apps";
import TocIcon from "@material-ui/icons/Toc";

import { DataGrid } from "@material-ui/data-grid";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  item: {},
  section: {
    marginTop: "1rem",
    marginBottom: "1rem",
    // borderTopStyle: "solid",
    // borderTopWidth: 1,
    // borderBottomStyle: "solid",
    // borderBottomWidth: 1,
  },
  filterField: {
    marginRight: "1rem",
  },
}));

const columns = [
  { field: "name", headerName: "Name", width: 200 },
  { field: "developer", headerName: "Developer", width: 200 },
  { field: "publisher", headerName: "Publisher", width: 200 },
  { field: "year", headerName: "Year", width: 150 },
  { field: "genre", headerName: "Genre", width: 200 },
  { field: "rating", headerName: "Rating", width: 150 },
  {
    field: "platform",
    headerName: "Platform",
    width: 150,
  },
  { field: "status", headerName: "Status", width: 150 },
];

const PlayedGamesList = () => {
  const classes = useStyles();
  const history = useHistory();
  const [rows, setRows] = useState([]);

  const tableView = () => {
    history.push("/tableview");
  };
  const gridview = () => {
    history.push("/");
  };

  useEffect(() => {
    api.getPlayedGames((data) => {
      data.forEach((game) => {
        game.platform = game.platform.name;
        game.status = game.status.name;
      });
      setRows(data);
    });
  }, []);

  return (
    <div>
      {console.log(rows)}
      <h1>Played Games</h1>

      <Grid container spacing={1} className={classes.section}></Grid>
      <Grid container spacing={1} style={{ margin: "0.2rem" }}>
        <Grid item xs={12}>
          <IconButton
            aria-label="Grid View"
            fontSize="large"
            onClick={gridview}
          >
            <AppsIcon />
          </IconButton>
          <IconButton
            aria-label="Table View"
            fontSize="large"
            onClick={tableView}
          >
            <TocIcon />
          </IconButton>
        </Grid>
        <div style={{ height: 700, width: "98%" }}>
          <DataGrid rows={rows} columns={columns} pageSize={20} />
        </div>
      </Grid>
    </div>
  );
};

export default PlayedGamesList;
