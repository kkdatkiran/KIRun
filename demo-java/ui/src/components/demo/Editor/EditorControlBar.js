import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

import KirunIcon from "../icons";

import {
  VISUAL_EDITOR,
  JSON_EDITOR /* CODE_EDITOR */,
  LEFT_TO_RIGHT_DIRECTION,
  TOP_TO_BOTTOM_DIRECTION,
  CURVED_CONNECTOR,
  STRAIGHT_CONNECTOR,
  RIGHT_ANGLED_CONNECTOR,
} from "./constants";

import {
  CHANGE_GRIDSIZE,
  CHANGE_EDITOR_TYPE,
  CHANGE_DIRECTION,
  CHANGE_CONNECTOR_TYPE,
  useEditorContextDispatch,
  useEditorContextState,
} from "../../../contexts/EditorContext";

export default function EditorControlBar() {
  const {
    gridSize,
    options: { editorType, connectorType, direction },
  } = useEditorContextState();
  const editorDispatch = useEditorContextDispatch();

  let buttons = [];

  buttons.push(
    <div className="buttonGroup" key="editoryTypePanel">
      <button
        className={`${editorType === VISUAL_EDITOR ? "selected" : ""}`}
        onClick={() => editorDispatch({ type: CHANGE_EDITOR_TYPE, payload: VISUAL_EDITOR })}
      >
        <FontAwesomeIcon icon="project-diagram" />
      </button>
      <button
        className={`${editorType === JSON_EDITOR ? "selected" : ""}`}
        onClick={() => editorDispatch({ type: CHANGE_EDITOR_TYPE, payload: JSON_EDITOR })}
      >
        <FontAwesomeIcon icon="tree" />
      </button>
      {/* <button
      className={`${
        editorType === CODE_EDITOR ? "selected" : ""
      }`}
        onClick={() =>
          editorDispatch({ type: CHANGE_EDITOR_TYPE, payload: CODE_EDITOR })
        }
      >
        <FontAwesomeIcon icon="border-all" />
      </button> */}
    </div>
  );

  if (editorType === VISUAL_EDITOR)
    buttons.push(
      <div className="buttonGroup" key="girdSizeButton">
        <button
          onClick={() =>
            editorDispatch({
              type: CHANGE_GRIDSIZE,
              payload: gridSize + 10 >= 40 ? 10 : gridSize + 10,
            })
          }
        >
          <FontAwesomeIcon icon="border-all" />
        </button>
      </div>,
      <div className="buttonGroup" key="connectorTypes">
        <button
          className={`${connectorType === CURVED_CONNECTOR ? "selected" : ""}`}
          onClick={() =>
            editorDispatch({
              type: CHANGE_CONNECTOR_TYPE,
              payload: CURVED_CONNECTOR,
            })
          }
        >
          <KirunIcon icon="kCurvedLine" />
        </button>
        <button
          className={`${connectorType === RIGHT_ANGLED_CONNECTOR ? "selected" : ""}`}
          onClick={() =>
            editorDispatch({
              type: CHANGE_CONNECTOR_TYPE,
              payload: RIGHT_ANGLED_CONNECTOR,
            })
          }
        >
          <KirunIcon icon="kRightAngledLine" />
        </button>
        <button
          className={`${connectorType === STRAIGHT_CONNECTOR ? "selected" : ""}`}
          onClick={() =>
            editorDispatch({
              type: CHANGE_CONNECTOR_TYPE,
              payload: STRAIGHT_CONNECTOR,
            })
          }
        >
          <KirunIcon icon="kStraightLine" />
        </button>
      </div>,
      <div className="buttonGroup" key="editorDirection">
        <button
          className={`${direction === TOP_TO_BOTTOM_DIRECTION ? "selected" : ""}`}
          onClick={() =>
            editorDispatch({
              type: CHANGE_DIRECTION,
              payload: TOP_TO_BOTTOM_DIRECTION,
            })
          }
        >
          <KirunIcon icon="kTopToBottom" />
        </button>
        <button
          className={`${direction === LEFT_TO_RIGHT_DIRECTION ? "selected" : ""}`}
          onClick={() =>
            editorDispatch({
              type: CHANGE_DIRECTION,
              payload: LEFT_TO_RIGHT_DIRECTION,
            })
          }
        >
          <KirunIcon icon="kLeftToRight" />
        </button>
      </div>
    );

  return buttons;
}
