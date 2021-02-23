import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Popup from "../Popup";

export default function Browser() {
  const [filterText, setFilterText] = useState("");
  const [newFunctionName, setNewFunctionName] = useState("");
  const [newFunctionPopup, setNewFunctionPopup] = useState(false);
  let popup = undefined;
  if (newFunctionPopup) {
    popup = (
      <Popup
        title="New function"
        buttons={["ok", "close"]}
        onButtonClick={(e) => {
          if (e.button === "close") setNewFunctionPopup(false);
        }}
      >
        <span className="prompt">Enter the function name:</span>
        <input
          value={newFunctionName}
          type="text"
          onChange={(e) => setNewFunctionName(e.target.value)}
          onKeyUp={(e) => {
            if (e.key !== "Enter") return;
            setNewFunctionPopup(false);
          }}
        />
      </Popup>
    );
  }

  return (
    <div className="browser">
      {popup}
      <div className="header">
        <span className="title">Function Browser</span>
        <button onClick={() => setNewFunctionPopup(true)}>
          <FontAwesomeIcon icon="plus" />
        </button>
      </div>
      <div className="filter">
        <input
          type="text"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          onKeyUp={(e) => e.key === "Enter" && filter(e.target.value)}
          placeholder={"Filter"}
        />
        <button onClick={() => setFilterText("")}>
          <FontAwesomeIcon icon="times-circle" />
        </button>
      </div>
      <div className="list"></div>
    </div>
  );
}

function filter() {}
