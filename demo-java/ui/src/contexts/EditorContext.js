import React from "react";

const EditorStateContext = React.createContext();
const EditorDispatchContext = React.createContext();

const defaultState = {
  gridSize: 20,
};

const CHANGE_GRIDSIZE = 1;

function editorReducer(state = defaultState, action) {
  if (!action || !action.type) return state;

  switch (action.type) {
    case CHANGE_GRIDSIZE:
      return { ...state, gridSize: action.payload };
    default:
      return state;
  }
}

function EditorContextProvider({ children, auth }) {
  let firstState = { ...defaultState, auth };
  const [state, dispatch] = React.useReducer(editorReducer, firstState);

  return (
    <EditorStateContext.Provider value={state}>
      <EditorDispatchContext.Provider value={dispatch}>
        {children}
      </EditorDispatchContext.Provider>
    </EditorStateContext.Provider>
  );
}

function useEditorContextState() {
  const ctx = React.useContext(EditorStateContext);
  if (!ctx)
    throw new Error(
      "Unable create context for editor context. Please use in components wrapped in EditorContextProvider."
    );
  return ctx;
}

function useEditorContextDispatch() {
  const ctx = React.useContext(EditorDispatchContext);
  if (!ctx)
    throw new Error(
      "Unable create context for editor context. Please use in components wrapped in EditorContextProvider."
    );
  return ctx;
}

export {
  EditorContextProvider,
  useEditorContextState,
  useEditorContextDispatch,
  CHANGE_GRIDSIZE,
};
