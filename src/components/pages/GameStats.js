/* eslint-disable eqeqeq */
import React, { useState, useEffect } from "react";
import api from "../../services/APICalls";
import { Chart } from "primereact/chart";

const GameStats = () => {
  const [total_games, setTotalGames] = useState();
  const [avg_score, setAvgScore] = useState(0);
  const [completionChart, setcompletionChart] = useState({
    labels: [],
    datasets: [{}],
  });
  const [completionPercent, setcompletionPercent] = useState({
    labels: [],
    datasets: [{}],
  });
  const [completionDrop, setCompletionDrop] = useState({
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

  //VARIABLES FOR DATA
  var completed = 0;
  var dropped = 0;
  var played = 0;
  var onHold = 0;

  var pc = 0;
  var ps3 = 0;
  var ps2 = 0;
  var ps1 = 0;
  var gba = 0;
  var nds = 0;
  var ds3 = 0;
  var nswitch = 0;
  var wiiu = 0;
  var psp = 0;
  var wii = 0;

  var y1996 = 0;
  var y1997 = 0;
  var y1998 = 0;
  var y1999 = 0;
  var y2000 = 0;
  var y2001 = 0;
  var y2002 = 0;
  var y2003 = 0;
  var y2004 = 0;
  var y2005 = 0;
  var y2006 = 0;
  var y2007 = 0;
  var y2008 = 0;
  var y2009 = 0;
  var y2010 = 0;
  var y2011 = 0;
  var y2012 = 0;
  var y2013 = 0;
  var y2014 = 0;
  var y2015 = 0;
  var y2016 = 0;
  var y2017 = 0;
  var y2018 = 0;
  var y2019 = 0;
  var y2020 = 0;
  var y2021 = 0;
  var y2022 = 0;

  var sc2 = 0;
  var sc3 = 0;
  var sc4 = 0;
  var sc5 = 0;
  var sc6 = 0;
  var sc7 = 0;
  var sc8 = 0;
  var sc9 = 0;
  var sc10 = 0;

  const completionOptions = {
    plugins: {
      legend: {
        labels: {
          color: "#495057",
        },
      },
      title: {
        display: true,
        text: "Completion nominal",
        font: {
          size: 16,
        },
      },
    },
  };
  const completionPercentageOptions = {
    plugins: {
      legend: {
        labels: {
          color: "#495057",
        },
      },
      title: {
        display: true,
        text: "Completion percentage",
        font: {
          size: 16,
        },
      },
    },
  };
  const completionDropOptions = {
    plugins: {
      legend: {
        labels: {
          color: "#495057",
        },
      },
      title: {
        display: true,
        text: "Completed vs Dropped Percentage",
        font: {
          size: 16,
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

  const getStats = (data) => {
    data.forEach((element) => {
      //COMPLETION
      if (element.status.name === "Completed") {
        completed++;
      } else if (element.status.name === "Dropped") {
        dropped++;
      } else if (element.status.name === "Played") {
        played++;
      } else if (element.status.name === "On Hold") {
        onHold++;
      }

      //PLATFORMS
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

      //YEARS
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
      else if (element.year === "2022") y2022++;

      //SCORES
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

    setAvgScore(
      (sc2 * 2 +
        sc3 * 3 +
        sc4 * 4 +
        sc5 * 5 +
        sc6 * 6 +
        sc7 * 7 +
        sc8 * 8 +
        sc9 * 9 +
        sc10 * 10) /
        data.length
    );
  };

  const getCompletionStats = (total_games) => {
    setcompletionChart({
      labels: ["Completed", "Played", "Dropped", "On Hold"],
      datasets: [
        {
          data: [completed, played, dropped, onHold],
          backgroundColor: ["#12c941", "#ffff00", "#d71c2f", "#fea604"],
          hoverBackgroundColor: ["#12b13a", "#d4d401", "#c51d2e", "#e39506"],
        },
      ],
    });
    setcompletionPercent({
      labels: ["Completed", "Played", "Dropped", "On Hold"],
      datasets: [
        {
          data: [
            (completed / total_games) * 100,
            (played / total_games) * 100,
            (dropped / total_games) * 100,
            (onHold / total_games) * 100,
          ],
          backgroundColor: ["#12c941", "#ffff00", "#d71c2f", "#fea604"],
          hoverBackgroundColor: ["#12b13a", "#d4d401", "#c51d2e", "#e39506"],
        },
      ],
    });
    setCompletionDrop({
      labels: ["Completed", "Dropped"],
      datasets: [
        {
          data: [
            (completed / (completed + dropped)) * 100,
            (dropped / (completed + dropped)) * 100,
          ],
          backgroundColor: ["#12c941", "#d71c2f"],
          hoverBackgroundColor: ["#12b13a", "#c51d2e"],
        },
      ],
    });
  };

  const getPlatformStats = () => {
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
  };

  const getYearsStats = () => {
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
        "2022",
      ],
      datasets: [
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
            y2022,
          ],
        },
      ],
    });
  };

  const getScoreStats = () => {
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
      setTotalGames(data.length);
      getStats(data);
      getCompletionStats(data.length);
      getPlatformStats();
      getYearsStats();
      getScoreStats();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="stats-wrapper">
      <h1>Played Games Stats</h1>
      <h3>Completion Rate</h3>
      <div className="flex justify-content-evenly stats-item">
        <Chart
          type="pie"
          data={completionChart}
          options={completionOptions}
          style={{ position: "relative", width: "20%" }}
        />
        <Chart
          type="pie"
          data={completionPercent}
          options={completionPercentageOptions}
          style={{ position: "relative", width: "20%" }}
        />
        <Chart
          type="pie"
          data={completionDrop}
          options={completionDropOptions}
          style={{ position: "relative", width: "20%" }}
        />
        <div className="flex-column justify-content-around">
          <h3>Total played games: {total_games}</h3>
          <h3>Avg Score: {avg_score}</h3>
        </div>
      </div>
      <div className=" stats-item">
        <Chart type="bar" data={platformChart} options={platformOptions} />
      </div>
      <div className="stats-item">
        <Chart type="bar" data={yearsChart} options={yearsOptions} />
      </div>
      <div className="stats-item">
        <Chart type="bar" data={scoresChart} options={scoreOptions} />
      </div>
    </div>
  );
};

export default GameStats;
