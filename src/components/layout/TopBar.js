import React from "react";
import { useHistory } from "react-router";

import * as styles from "../../styles/styles";

import { Toolbar } from "primereact/toolbar";
import { Button } from "primereact/button";
import { SplitButton } from "primereact/splitbutton";

import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import * as routes from "../../routes";

const top_10_items = [
  {
    label: "Top 10 Games",
    icon: "pi pi-bars",
    command: () => {},
  },
];

const TopBar = () => {
  const [darkMode, setDarkMode] = React.useState(false);
  const darkModeToggle = () => {
    if (!darkMode) {
      document.body.classList.add("dark-mode");
      setDarkMode(true);
    } else {
      document.body.classList.remove("dark-mode");
      setDarkMode(false);
    }
  };
  const leftContents = (
    <React.Fragment>
      <h2 style={styles.logo}>DRG API</h2>
      <Link to={routes.playedgames}>
        <span>Played Games</span>
      </Link>
      <SplitButton
        label="Top 10"
        icon="pi pi-check"
        model={top_10_items}
        className="p-button-warning"
      ></SplitButton>
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
    <div>
      <Toolbar
        left={leftContents}
        right={rightContents}
        style={styles.topbar}
        className="topbar"
      />
    </div>
  );
};

export default TopBar;