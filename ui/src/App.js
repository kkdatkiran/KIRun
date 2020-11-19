import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Nav from "./components/site/Nav";
import Home from "./components/site/Home";
import About from "./components/site/About";
import Docs from "./components/site/Docs";
import ContactUs from "./components/site/ContactUs";
import Demo from "./components/demo/Demo";
import LeftSide from "./components/site/LeftSide";
import Logo from "./components/site/Logo";
import Message from "./components/site/Message";

import { ContactContextProvider } from "./contexts/ContactContext";

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
