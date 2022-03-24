import React from "react";

import { Toolbar } from "primereact/toolbar";

import { Link } from "react-router-dom";
import * as routes from "../../routes";

const TopBar = () => {
  const leftContents = (
    <React.Fragment>
      <Link to={routes.home}>
        <h2 className="logo">
          {" "}
          <i className="pi pi-book"></i> My Games Shelve
        </h2>
      </Link>

      <Link to={routes.playedgames}>
        <span>
          <i className="pi pi-list"></i> Games List
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
          <i className="pi pi-star"></i> Top 10 Games
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
          <i className="pi pi-star"></i> Top 10 Characters
        </span>
      </Link>
    </React.Fragment>
  );

  const rightContents = <React.Fragment></React.Fragment>;
  return (
    <div className="sticky-section">
      <Toolbar left={leftContents} right={rightContents} className="topbar" />
    </div>
  );
};

export default TopBar;
