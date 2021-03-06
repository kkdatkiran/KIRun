import React from "react";

import { EditorContextProvider } from "../../../contexts/EditorContext";
import { useLoginContextState } from "./../../../contexts/LoginContext";
import Browser from "./Browser/Browser";
import Editor from "./../Editor/Editor";
import Login from "./login/Login";

export default function DemoServerClient() {
  return <div className="demoContainer">Under construction...</div>;
}

function DemoServerClient_actual() {
  const { auth } = useLoginContextState();

  if (!auth) return <Login />;

  return (
    <EditorContextProvider>
      <div className="demoContainer">
        <Browser />
        <Editor version="V001Remote" />
      </div>
    </EditorContextProvider>
  );
}
