import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faPlus,
  faTimesCircle,
  faBorderAll,
  faProjectDiagram,
  faCode,
  faTree,
} from "@fortawesome/free-solid-svg-icons";

library.add(
  faPlus,
  faTimesCircle,
  faBorderAll,
  faProjectDiagram,
  faCode,
  faTree
);

import App from "./App";

import { LoginContextProvider } from "./contexts/LoginContext";
import { MessageContextProvider } from "./contexts/MessageContext";

import { refreshLogin } from "./services/loginService";

axios.interceptors.request.use(function (config) {
  const token = "Bearer " + window.localStorage.getItem("authToken");
  config.headers.Authorization = token;
  return config;
});

async function refreshToken() {
  const token = window.localStorage.getItem("authToken");
  if (!token) return Promise.resolve(undefined);

  const { data: { data: auth } = {} } = await refreshLogin();
  return auth;
}

function initialize(auth) {
  let myAuth = undefined;

  if (Array.isArray(auth) && auth[0]) {
    myAuth = auth[0];
  }

  const wrapper = document.getElementById("appdiv");
  wrapper
    ? ReactDOM.render(
        <MessageContextProvider>
          <LoginContextProvider auth={myAuth}>
            <App />
          </LoginContextProvider>
        </MessageContextProvider>,
        wrapper
      )
    : false;
}

Promise.all([refreshToken()]).then(initialize).catch(initialize);
