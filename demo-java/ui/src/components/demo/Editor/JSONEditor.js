import React, { useEffect, useState } from "react";
import MonacoEditor from "react-monaco-editor";

export default function JSONEditor({ container, code, onChange, version }) {
  const [json, setJSON] = useState();

  useEffect(() => {
    setJSON(JSON.stringify(code, null, 2));
  }, [JSON.stringify(code)]);

  // Deal with version when validating the values.

  return (
    <MonacoEditor
      width={container.current.getBoundingClientRect().width}
      height={container.current.getBoundingClientRect().height}
      language="json"
      theme="vs"
      value={json}
      onChange={(j) => {
        setJSON(j);
        try {
          let obj = JSON.parse(j);
          onChange(obj);
        } catch (err) {}
      }}
    />
  );
}
