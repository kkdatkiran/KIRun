import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

import { MessageContextProvider } from "./contexts/MessageContext";

const wrapper = document.getElementById("appdiv");
wrapper
  ? ReactDOM.render(
      <MessageContextProvider>
        <App />
      </MessageContextProvider>,
      wrapper
    )
  : false;
