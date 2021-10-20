import React from "react";

import { Toolbar } from "primereact/toolbar";
import { Button } from "primereact/button";

import { Link } from "react-router-dom";
import * as routes from "../../routes";

const TopBar = () => {
  const [darkMode, setDarkMode] = React.useState(false);

  const darkModeToggle = () => {
    if (!darkMode) {
      document.body.classList.add("dark-mode");
      document.body.classList.remove("light-mode");
      setDarkMode(true);
    } else {
      document.body.classList.remove("dark-mode");
      document.body.classList.add("light-mode");
      setDarkMode(false);
    }
  };
  const leftContents = (
    <React.Fragment>
      <h2 className="logo">DRG API</h2>
      <Link to={routes.playedgames}>
        <span>
          <i className="pi pi-home"></i> Played Games
        </span>
      </Link>
      <Link to={routes.uploadgame}>
        <span>
          <i className="pi pi-upload"></i> Upload Game
        </span>
      </Link>
      <Link to={routes.stats}>
        <span>
          {" "}
          <i className="pi pi-chart-bar"></i> Stats
        </span>
      </Link>
      <Link
        to={{
          pathname: routes.top10games,
          state: { top10name: "All Time" },
        }}
      >
        <span>
          {" "}
          <i className="pi pi-bar"></i> Top 10 Games
        </span>
      </Link>
      <Link
        to={{
          pathname: routes.top10characters,
          state: { top10name: "All Time" },
        }}
      >
        <span>
          {" "}
          <i className="pi pi-bar"></i> Top 10 Characters
        </span>
      </Link>
      {/* <SplitButton
        label="Top 10"
        icon="pi pi-check"
        model={top_10_items}
        className="p-button-warning"
      ></SplitButton> */}
    </React.Fragment>
  );

  const rightContents = (
    <React.Fragment>
      <Button
        icon={darkMode ? "pi pi-sun" : "pi pi-moon"}
        className="p-mr-2"
        onClick={darkModeToggle}
      />
    </React.Fragment>
  );
  return (
    <div className="sticky-section">
      <Toolbar left={leftContents} right={rightContents} className="topbar" />
    </div>
  );
};

export default TopBar;
