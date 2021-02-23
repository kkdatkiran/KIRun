import React from "react";

import { EditorContextProvider } from "../../contexts/EditorContext";
import { useLoginContextState } from "./../../contexts/LoginContext";
import Browser from "./Browser/Browser";
import Editor from "./Editor/Editor";
import Login from "./login/Login";

export default function Demo() {
  const { auth } = useLoginContextState();

  if (!auth) return <Login />;

  return (
    <EditorContextProvider>
      <div className="demoContainer">
        <Browser />
        <Editor />
      </div>
    </EditorContextProvider>
  );
}
