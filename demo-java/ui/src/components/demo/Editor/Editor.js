import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef } from "react";
import {
  CHANGE_GRIDSIZE,
  useEditorContextDispatch,
  useEditorContextState,
} from "../../../contexts/EditorContext";
import Grid from "./Grid";

export default function Editor() {
  const canvasContainer = useRef();

  const { gridSize } = useEditorContextState();
  const editorDispatch = useEditorContextDispatch();

  return (
    <div className="editor">
      <div className="header">
        <span className="title">Function Editor</span>
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
      <div className="body" ref={canvasContainer}>
        <Grid canvasContainer={canvasContainer}></Grid>
      </div>
    </div>
  );
}
