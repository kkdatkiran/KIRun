import React, { Component } from "react";
import ReactDOM from "react-dom";

function Title(props) {
  return <h1> Hello1 </h1>;
}

const wrapper = document.getElementById("appdiv");
wrapper ? ReactDOM.render(<Title />, wrapper) : false;
