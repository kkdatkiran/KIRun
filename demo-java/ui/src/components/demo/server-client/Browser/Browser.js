import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Popup from "../../Popup";
import {
  useEditorContextDispatch,
  useEditorContextState,
  CHANGE_SERVICE_FUNCTIONS,
  CHANGE_SERVICE_SELECTION,
} from "../../../../contexts/EditorContext";

import { getServiceFunctions } from "../../../../services/editorService";

async function listServiceFunctions(dispatch, name) {
  const { data: { data: payload } = {} } = await getServiceFunctions(name);
  dispatch({ type: CHANGE_SERVICE_FUNCTIONS, payload });
}

export default function Browser() {
  const [filterText, setFilterText] = useState("");
  const [newFunctionName, setNewFunctionName] = useState("");
  const [newFunctionPopup, setNewFunctionPopup] = useState(false);

  const { serviceFunctions: { content: list = [] } = {}, selected } = useEditorContextState();

  const dispatch = useEditorContextDispatch();

  useEffect(() => {
    listServiceFunctions(dispatch);
  }, []);

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
        <div className="buttonGroup">
          <button onClick={() => setNewFunctionPopup(true)}>
            <FontAwesomeIcon icon="plus" />
          </button>
        </div>
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
      <div className="list">
        {list.map((e, i) => (
          <div
            key={e.id}
            className={`listItem ${i === selected ? "selected" : ""}`}
            role="button"
            tabIndex="0"
            onClick={() => dispatch({ type: CHANGE_SERVICE_SELECTION, payload: i })}
            onKeyDown={() => {}}
          >
            {e.name}
          </div>
        ))}
      </div>
    </div>
  );
}

function filter() {}
