import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Nav from "./siteComponents/Nav";
import Home from "./siteComponents/Home";
import About from "./siteComponents/About";
import Docs from "./siteComponents/Docs";
import ContactUs from "./siteComponents/ContactUs";
import Demo from "./demoComponents/Demo";
import LeftSide from "./siteComponents/LeftSide";
import Logo from "./siteComponents/Logo";
import { ContactContextProvider } from "./contexts/ContactContext";
import Message from "./siteComponents/Message";

export default function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/">
            <>
              <Nav />
              <Logo />
              <LeftSide styleClassName="home" />
              <div className="home textContainer">
                <Home />
              </div>
            </>
          </Route>
          <Route path="/docs">
            <>
              <Nav />
              <Logo />
              <LeftSide styleClassName="docs" />
              <div className="docs textContainer">
                <Docs />
              </div>
            </>
          </Route>
          <Route path="/demo">
            <>
              <Nav isDemo={true} />
              <Logo isDemo={true} />
              <Demo />
            </>
          </Route>
          <Route path="/about">
            <>
              <Nav />
              <Logo />
              <LeftSide styleClassName="about" />
              <div className="about textContainer">
                <About />
              </div>
            </>
          </Route>
          <Route path="/contactUs">
            <>
              <Nav />
              <Logo />
              <LeftSide styleClassName="contactUs" />
              <div className="contactUs textContainer">
                <ContactContextProvider>
                  <ContactUs />
                </ContactContextProvider>
              </div>
            </>
          </Route>
        </Switch>
      </Router>
      <Message />
    </>
  );
}
