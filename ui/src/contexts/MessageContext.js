import React from "react";

const MessageStateContext = React.createContext();
const MessageDispatchContext = React.createContext();

const defaultState = [];

const ADD_MESSAGE = 1;
const DELETE_MESSAGE = 2;
const CLEAR_OLD_MESSAGES = 4;

function messageReducer(state = defaultState, action) {
  if (!action || !action.type) return;

  switch (action.type) {
    case ADD_MESSAGE:
      if (!action.payload) return state;
      return [{ ...action.payload, when: Date.now() }, ...state];
    case DELETE_MESSAGE:
      return state.filter((e) => e.when !== action.payload);
    case CLEAR_OLD_MESSAGES:
      return state.filter((e) => Date.now() - e.when < 10000);
    default:
      return state;
  }
}

function MessageContextProvider({ children }) {
  const [state, dispatch] = React.useReducer(messageReducer, defaultState);

  return (
    <MessageStateContext.Provider value={state}>
      <MessageDispatchContext.Provider value={dispatch}>
        {children}
      </MessageDispatchContext.Provider>
    </MessageStateContext.Provider>
  );
}

function useMessageContextState() {
  const ctx = React.useContext(MessageStateContext);
  if (!ctx)
    throw new Error(
      "Unable create context for message context. Please use in components wrapped in MessageContextProvider."
    );
  return ctx;
}

function useMessageContextDispatch() {
  const ctx = React.useContext(MessageDispatchContext);
  if (!ctx)
    throw new Error(
      "Unable create context for message context. Please use in components wrapped in MessageContextProvider."
    );
  return ctx;
}

export {
  MessageContextProvider,
  useMessageContextState,
  useMessageContextDispatch,
  ADD_MESSAGE,
  DELETE_MESSAGE,
  CLEAR_OLD_MESSAGES,
};
