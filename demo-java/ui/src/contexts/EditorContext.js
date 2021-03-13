import React from "react";

const EditorStateContext = React.createContext();
const EditorDispatchContext = React.createContext();

const VISUAL_EDITOR = 1;
const JSON_EDITOR = 2;
const CODE_EDITOR = 3;

const CHANGE_GRIDSIZE = 400001;
const CHANGE_EDITOR_TYPE = 400002;
const CHANGE_SERVICE_FUNCTIONS = 400003;
const CHANGE_SERVICE_SELECTION = 400004;
const CHANGE_SERVICE = 400005;

const defaultState = {
  options: { gridSize: 20 },
  editorType: VISUAL_EDITOR,
  serviceFunctions: { content: [] },
  selected: -1,
};

function editorReducer(state = defaultState, action) {
  if (!action || !action.type) return state;

  switch (action.type) {
    case CHANGE_GRIDSIZE:
      return {
        ...state,
        options: { ...state.options, gridSize: action.payload },
      };
    case CHANGE_EDITOR_TYPE:
      return { ...state, editorType: action.payload };
    case CHANGE_SERVICE_FUNCTIONS:
      return { ...state, serviceFunctions: action.payload, selected: 0 };
    case CHANGE_SERVICE_SELECTION:
      return { ...state, selected: action.payload };
    case CHANGE_SERVICE: {
      if (
        !state.serviceFunctions?.content[
          action.payload.selected ?? state.selected
        ]
      )
        return state;

      state = JSON.parse(JSON.stringify(state));
      state.serviceFunctions.content[
        action.payload.selected ?? state.selected
      ] = action.payload.service;
      return state;
    }
    default:
      return state;
  }
}

function EditorContextProvider({ children, defaultService }) {
  let firstState = { ...defaultState };
  if (defaultService) {
    firstState.serviceFunctions = { content: [defaultService] };
    firstState.selected = 0;
  }
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
  CHANGE_EDITOR_TYPE,
  VISUAL_EDITOR,
  JSON_EDITOR,
  CODE_EDITOR,
  CHANGE_SERVICE_FUNCTIONS,
  CHANGE_SERVICE_SELECTION,
  CHANGE_SERVICE,
};
