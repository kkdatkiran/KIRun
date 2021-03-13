import React from "react";
import axios from "axios";

const MessageStateContext = React.createContext();
const MessageDispatchContext = React.createContext();

const defaultState = [];

const ADD_MESSAGE = 200001;
const DELETE_MESSAGE = 200002;
const CLEAR_OLD_MESSAGES = 200004;

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

let registered = undefined;
function MessageContextProvider({ children }) {
  const [state, dispatch] = React.useReducer(messageReducer, defaultState);

  function handler(response) {
    let {
      data: { type, message, error: { errorCode, message: errorMessage } = {} },
      status,
      data,
      statusText,
    } = response;
    let msg = errorCode ? errorMessage : message;
    if (!msg && (status < 200 || status > 299)) {
      type = "ERROR";
      msg = data ? data : statusText;
    }
    if (!msg) return response;
    dispatch({
      type: ADD_MESSAGE,
      payload: { type, message: msg, errorCode },
    });
    return response;
  }

  if (!registered) {
    axios.interceptors.response.use(handler, (err) => {
      handler(err.response);
      throw err;
    });

    registered = true;
  }

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
