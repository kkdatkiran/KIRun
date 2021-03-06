import React from "react";
import { NavLink } from "react-router-dom";

export default function Navigate(props) {
  return (
    <>
      <nav className={props.isDemo ? "demoNav" : ""}>
        <div className="home">
          <NavLink exact to="/" activeClassName="activeLink">
            HOME
          </NavLink>
        </div>
        <div className="github">
          <a href="https://github.com/kkdatkiran/KIRun" rel="noreferrer" target="_blank">
            GITHUB
          </a>
        </div>
        <div className="docs">
          <NavLink to="/docs" activeClassName="activeLink">
            DOCS
          </NavLink>
        </div>
        <div className="demo">
          <NavLink to="/demoJava" activeClassName="activeLink">
            DEMO Java
          </NavLink>
        </div>
        <div className="demo">
          <NavLink to="/demoJS" activeClassName="activeLink">
            DEMO JS
          </NavLink>
        </div>
        <div className="about">
          <NavLink to="/about" activeClassName="activeLink">
            ABOUT
          </NavLink>
        </div>
        <div className="contactUs">
          <NavLink to="/contactUS" activeClassName="activeLink">
            CONTACT
          </NavLink>
        </div>
      </nav>
      <div className={props.isDemo ? "demo footer" : "footer"}>
        The contents of this website and the GitHub repository are under the MIT License. &copy;{new Date().getFullYear()}
      </div>
    </>
  );
}
