import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

const wrapper = document.getElementById("appdiv");
wrapper ? ReactDOM.render(<App />, wrapper) : false;
