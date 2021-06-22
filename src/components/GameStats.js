import React, { useState, useEffect } from "react";
import api from "../services/APICalls";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Chart } from "primereact/chart";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: "2rem",
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

const GameStats = () => {
  const classes = useStyles();
  const [games, setGames] = useState([]);
  const [completionChart, setcompletionChart] = useState({
    labels: [],
    datasets: [{}],
  });
  const [platformChart, setPlatformChart] = useState({
    labels: [],
    datasets: [{}],
  });
  const [yearsChart, setYearsChart] = useState({
    labels: [],
    datasets: [{}],
  });
  const [scoresChart, setScoresChart] = useState({
    labels: [],
    datasets: [{}],
  });

  const completionOptions = {
    plugins: {
      legend: {
        labels: {
          color: "#495057",
        },
      },
    },
  };

  const platformOptions = {
    maintainAspectRatio: false,
    aspectRatio: 0.8,
    plugins: {
      legend: {
        labels: {
          color: "#495057",
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#495057",
        },
        grid: {
          color: "#ebedef",
        },
      },
      y: {
        ticks: {
          color: "#495057",
        },
        grid: {
          color: "#ebedef",
        },
      },
    },
  };

  const yearsOptions = {
    maintainAspectRatio: false,
    aspectRatio: 0.8,
    plugins: {
      legend: {
        labels: {
          color: "#60036d",
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#60036d",
        },
        grid: {
          color: "#ebedef",
        },
      },
      y: {
        ticks: {
          color: "#495057",
        },
        grid: {
          color: "#ebedef",
        },
      },
    },
  };

  const scoreOptions = {
    maintainAspectRatio: false,
    aspectRatio: 0.8,
    plugins: {
      legend: {
        labels: {
          color: "#13cf46",
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#60036d",
        },
        grid: {
          color: "#ebedef",
        },
      },
      y: {
        ticks: {
          color: "#495057",
        },
        grid: {
          color: "#ebedef",
        },
      },
    },
  };

  const getCompletionStats = (data) => {
    let completed = 0;
    let dropped = 0;
    let played = 0;
    data.forEach((element) => {
      if (element.status.name === "Completed") {
        completed++;
      } else if (element.status.name === "Dropped") {
        dropped++;
      } else if (element.status.name === "Played") {
        played++;
      }
    });
    setcompletionChart({
      labels: ["Completed", "Played", "Dropped"],
      datasets: [
        {
          data: [completed, played, dropped],
          backgroundColor: ["#12c941", "#ffff00", "#d71c2f"],
          hoverBackgroundColor: ["#12b13a", "#d4d401", "#c51d2e"],
        },
      ],
    });
  };

  const getPlatformStats = (data) => {
    let pc = 0;
    let ps3 = 0;
    let ps2 = 0;
    let ps1 = 0;
    let gba = 0;
    let nds = 0;
    let ds3 = 0;
    let nswitch = 0;
    let wiiu = 0;
    let psp = 0;
    let wii = 0;
    data.forEach((element) => {
      if (element.platform.name === "PC") {
        pc++;
      } else if (element.platform.name === "Nintendo DS") {
        nds++;
      } else if (element.platform.name === "PS3") {
        ps3++;
      } else if (element.platform.name === "PS2") {
        ps2++;
      } else if (element.platform.name === "PS1") {
        ps1++;
      } else if (element.platform.name === "GameBoy Advance") {
        gba++;
      } else if (element.platform.name === "Nintendo 3DS") {
        ds3++;
      } else if (element.platform.name === "Nintendo Switch") {
        nswitch++;
      } else if (element.platform.name === "Nintendo WiiU") {
        wiiu++;
      } else if (element.platform.name === "Nintendo Wii") {
        wii++;
      } else if (element.platform.name === "PSP") {
        psp++;
      }
      setPlatformChart({
        labels: [
          "PC",
          "PS1",
          "PS2",
          "PS3",
          "PSP",
          "GBA",
          "Wii",
          "WiiU",
          "NDS",
          "3DS",
          "Switch",
        ],
        datasets: [
          {
            label: "Games per Platform",
            backgroundColor: "#42A5F5",
            data: [pc, ps1, ps2, ps3, psp, gba, wii, wiiu, nds, ds3, nswitch],
          },
        ],
      });
    });
  };

  const getYearsStats = (data) => {
    let y1996 = 0;
    let y1997 = 0;
    let y1998 = 0;
    let y1999 = 0;
    let y2000 = 0;
    let y2001 = 0;
    let y2002 = 0;
    let y2003 = 0;
    let y2004 = 0;
    let y2005 = 0;
    let y2006 = 0;
    let y2007 = 0;
    let y2008 = 0;
    let y2009 = 0;
    let y2010 = 0;
    let y2011 = 0;
    let y2012 = 0;
    let y2013 = 0;
    let y2014 = 0;
    let y2015 = 0;
    let y2016 = 0;
    let y2017 = 0;
    let y2018 = 0;
    let y2019 = 0;
    let y2020 = 0;
    let y2021 = 0;

    data.forEach((element) => {
      if (element.year === "1996") y1996++;
      else if (element.year === "1997") y1997++;
      else if (element.year === "1998") y1998++;
      else if (element.year === "1999") y1999++;
      else if (element.year === "2000") y2000++;
      else if (element.year === "2001") y2001++;
      else if (element.year === "2002") y2002++;
      else if (element.year === "2003") y2003++;
      else if (element.year === "2004") y2004++;
      else if (element.year === "2005") y2005++;
      else if (element.year === "2006") y2006++;
      else if (element.year === "2007") y2007++;
      else if (element.year === "2008") y2008++;
      else if (element.year === "2009") y2009++;
      else if (element.year === "2010") y2010++;
      else if (element.year === "2011") y2011++;
      else if (element.year === "2012") y2012++;
      else if (element.year === "2013") y2013++;
      else if (element.year === "2014") y2014++;
      else if (element.year === "2015") y2015++;
      else if (element.year === "2016") y2016++;
      else if (element.year === "2017") y2017++;
      else if (element.year === "2018") y2018++;
      else if (element.year === "2019") y2019++;
      else if (element.year === "2020") y2020++;
      else if (element.year === "2021") y2021++;
    });
    setYearsChart({
      labels: [
        "1996",
        "1997",
        "1998",
        "1999",
        "2000",
        "2001",
        "2002",
        "2003",
        "2004",
        "2005",
        "2006",
        "2007",
        "2008",
        "2009",
        "2010",
        "2011",
        "2012",
        "2013",
        "2014",
        "2015",
        "2016",
        "2017",
        "2018",
        "2019",
        "2020",
        "2021",
      ],
      datasets: [
        {
          type: "line",
          label: "Games per Year",
          backgroundColor: "#e00dbb",
          borderWidth: 2,
          fill: false,
          tension: 0.4,
          data: [
            y1996,
            y1997,
            y1998,
            y1999,
            y2000,
            y2001,
            y2002,
            y2003,
            y2004,
            y2005,
            y2006,
            y2007,
            y2008,
            y2009,
            y2010,
            y2011,
            y2012,
            y2013,
            y2014,
            y2015,
            y2016,
            y2017,
            y2018,
            y2019,
            y2020,
            y2021,
          ],
        },
        {
          type: "bar",
          label: "Games per Year",
          backgroundColor: "#d8e00d",
          data: [
            y1996,
            y1997,
            y1998,
            y1999,
            y2000,
            y2001,
            y2002,
            y2003,
            y2004,
            y2005,
            y2006,
            y2007,
            y2008,
            y2009,
            y2010,
            y2011,
            y2012,
            y2013,
            y2014,
            y2015,
            y2016,
            y2017,
            y2018,
            y2019,
            y2020,
            y2021,
          ],
        },
      ],
    });
  };

  const getScoreStats = (data) => {
    let sc2 = 0;
    let sc3 = 0;
    let sc4 = 0;
    let sc5 = 0;
    let sc6 = 0;
    let sc7 = 0;
    let sc8 = 0;
    let sc9 = 0;
    let sc10 = 0;
    data.forEach((element) => {
      if (element.rating == 2) sc2++;
      else if (element.rating == 3) sc3++;
      else if (element.rating == 4) sc4++;
      else if (element.rating == 5) sc5++;
      else if (element.rating == 6) sc6++;
      else if (element.rating == 7) sc7++;
      else if (element.rating == 8) sc8++;
      else if (element.rating == 9) sc9++;
      else if (element.rating == 10) sc10++;
    });
    setScoresChart({
      labels: ["2", "3", "4", "5", "6", "7", "8", "9", "10"],
      datasets: [
        {
          label: "Games per Score",
          backgroundColor: "#13cf46",
          data: [sc2, sc3, sc4, sc5, sc6, sc7, sc8, sc9, sc10],
        },
      ],
    });
  };

  useEffect(() => {
    api.getPlayedGames((data) => {
      setGames(data);
      getCompletionStats(data);
      getPlatformStats(data);
      getYearsStats(data);
      getScoreStats(data);
    });
  }, []);

  return (
    <div>
      <h1>Played Games Stats</h1>
      <Grid container spacing={1} className={classes.root}>
        <Grid item xs={4}>
          <h2>Completion Rate</h2>
          <Chart
            type="pie"
            data={completionChart}
            options={completionOptions}
            style={{ position: "relative" }}
          />
        </Grid>
        <Grid item xs={8}>
          <Chart type="bar" data={platformChart} options={platformOptions} />
        </Grid>
      </Grid>
      <Grid container spacing={1} className={classes.root}>
        <Grid item xs={12}>
          <Chart type="bar" data={yearsChart} options={yearsOptions} />
        </Grid>
      </Grid>
      <Grid container spacing={1} className={classes.root}>
        <Grid item xs={12}>
          <Chart type="bar" data={scoresChart} options={scoreOptions} />
        </Grid>
      </Grid>
    </div>
  );
};

export default GameStats;
