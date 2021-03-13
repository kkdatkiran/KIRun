import React, { useRef } from "react";
import * as Engine from "kirun-engine-js";

import {
  useEditorContextState,
  JSON_EDITOR,
  useEditorContextDispatch,
  CHANGE_SERVICE,
} from "../../../contexts/EditorContext";
import EditorControlBar from "./EditorControlBar";
import Grid from "./GridEditor/Grid";
import JSONEditor from "./JSONEditor";

export default function Editor({ version = "V001" }) {
  const container = useRef();

  const {
    editorType,
    serviceFunctions: { content: services = [] } = {},
    selected = -1,
    options,
  } = useEditorContextState();

  const dispatch = useEditorContextDispatch();

  const CurrentEditor = editorType === JSON_EDITOR ? JSONEditor : Grid;
  console.log(Engine[version]?.statements);
  return (
    <div className="editor">
      <div className="header">
        <span className="title">Function Editor</span>
        <EditorControlBar version={version} />
      </div>
      <div className="body" ref={container}>
        <CurrentEditor
          container={container}
          code={services[selected]}
          version={version}
          options={options}
          onChange={(e) =>
            dispatch({
              type: CHANGE_SERVICE,
              payload: { selected, service: e },
            })
          }
        />
      </div>
    </div>
  );
}
