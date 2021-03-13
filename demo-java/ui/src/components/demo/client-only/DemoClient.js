import React from "react";

import { EditorContextProvider } from "../../../contexts/EditorContext";
import Editor from "../Editor/Editor";

export default function DemoServerClient() {
  return (
    <EditorContextProvider
      defaultService={{
        definition: {
          steps: {
            "e67b2986-932d-4519-a115-6047946d5da2": {
              type: "START",
              properties: {
                x: 80,
                y: 50,
              },
            },
            "5df326f8-8720-48e4-b342-b6ebdbc28045": {
              type: "END",
              properties: {
                x: 80,
                y: 300,
              },
            },
          },
          flow: {
            "e67b2986-932d-4519-a115-6047946d5da2": {
              next: "5df326f8-8720-48e4-b342-b6ebdbc28045",
            },
          },
        },
        name: "Untitled Service",
        id: "Untitled Service",
      }}
    >
      <div className="demoContainer">
        <Editor />
      </div>
    </EditorContextProvider>
  );
}
