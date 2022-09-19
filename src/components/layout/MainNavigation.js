import React from "react";
import classes from "./MainNavigation.module.css";
import { Link, NavLink } from "react-router-dom";

function MainNavigation() {
  return (
    <header className={classes.header}>
      <Link to="/quotes" className={classes.logo}>
        Great Quotes
      </Link>
      <nav className={classes.nav}>
        <ul>
          <li>
            <NavLink to="/quotes" activeClassName={classes.active}>
              All Quetes
            </NavLink>
          </li>
          <li>
            <NavLink to="/new-quote" activeClassName={classes.active}>
              Add a quete
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
