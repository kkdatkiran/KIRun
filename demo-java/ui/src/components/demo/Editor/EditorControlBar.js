import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

import {
  CHANGE_GRIDSIZE,
  CHANGE_EDITOR_TYPE,
  JSON_EDITOR,
  VISUAL_EDITOR,
  // CODE_EDITOR,
  useEditorContextDispatch,
  useEditorContextState,
} from "../../../contexts/EditorContext";

export default function EditorControlBar() {
  const { gridSize, editorType } = useEditorContextState();
  const editorDispatch = useEditorContextDispatch();

  let buttons = [];

  buttons.push(
    <div className="buttonGroup" key="editoryTypePanel">
      <button
        onClick={() =>
          editorDispatch({ type: CHANGE_EDITOR_TYPE, payload: VISUAL_EDITOR })
        }
      >
        <FontAwesomeIcon icon="project-diagram" />
      </button>
      <button
        onClick={() =>
          editorDispatch({ type: CHANGE_EDITOR_TYPE, payload: JSON_EDITOR })
        }
      >
        <FontAwesomeIcon icon="tree" />
      </button>
      {/* <button
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
      </div>
    );

  return buttons;
}
