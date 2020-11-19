import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

import { LoginContextProvider } from "./contexts/LoginContext";
import { MessageContextProvider } from "./contexts/MessageContext";

const wrapper = document.getElementById("appdiv");
wrapper
  ? ReactDOM.render(
      <MessageContextProvider>
        <LoginContextProvider>
          <App />
        </LoginContextProvider>
      </MessageContextProvider>,
      wrapper
    )
  : false;
