import React from "react";

const ContactStateContext = React.createContext();
const ContactDispatchContext = React.createContext();
const defaultState = {};

const ADD_CAPTCHA_INFO = 100001;
const NAME_CHANGE = 100002;
const EMAIL_CHANGE = 100004;
const MESSAGE_CHANGE = 100006;
const CAPTCHA_CHANGE = 100008;
const VALIDATE_FORM = 1000016;
const CLEAR_FORM = 1000032;

const MAP = {
  [NAME_CHANGE]: { key: "name", errorKey: "nameError", title: "Name" },
  [EMAIL_CHANGE]: { key: "email", errorKey: "emailError", title: "Email" },
  [MESSAGE_CHANGE]: {
    key: "message",
    errorKey: "messageError",
    title: "Message",
  },
  [CAPTCHA_CHANGE]: {
    key: "captcha",
    errorKey: "captchaError",
    title: "Captcha",
  },
};

function contactReducer(state = defaultState, action) {
  if (!action) return state;
  if (!action.type) return state;

  switch (action.type) {
    case ADD_CAPTCHA_INFO:
      return { ...state, ...action.payload };
    case VALIDATE_FORM: {
      let s = { ...state };
      Object.values(MAP).forEach((e) => {
        if (s[e.key]) {
          delete s[e.errorKey];
        } else {
          s[e.errorKey] = e.title + " cannot be empty.";
        }
      });
      return s;
    }
    case NAME_CHANGE:
    case EMAIL_CHANGE:
    case MESSAGE_CHANGE:
    case CAPTCHA_CHANGE: {
      let key = MAP[action.type].key;
      let errorKey = MAP[action.type].errorKey;
      let returnState = { ...state, [key]: action.payload };
      if (action.payload === "") {
        returnState[errorKey] = MAP[action.type].title + " cannot be empty.";
      } else {
        delete returnState[errorKey];
      }
      return returnState;
    }
    case CLEAR_FORM:
      return defaultState;
    default:
      return state;
  }
}

function ContactContextProvider({ children }) {
  const [state, dispatch] = React.useReducer(contactReducer, defaultState);

  return (
    <ContactStateContext.Provider value={state}>
      <ContactDispatchContext.Provider value={dispatch}>{children}</ContactDispatchContext.Provider>
    </ContactStateContext.Provider>
  );
}

function useContactContextState() {
  const ctx = React.useContext(ContactStateContext);
  if (!ctx)
    throw new Error("Unable create context for contact context. Please use in components wrapped in ContactContextProvider.");
  return ctx;
}

function useContactContextDispatch() {
  const ctx = React.useContext(ContactDispatchContext);
  if (!ctx)
    throw new Error("Unable create context for contact context. Please use in components wrapped in ContactContextProvider.");
  return ctx;
}

export {
  ContactContextProvider,
  useContactContextState,
  useContactContextDispatch,
  ADD_CAPTCHA_INFO,
  NAME_CHANGE,
  EMAIL_CHANGE,
  MESSAGE_CHANGE,
  CAPTCHA_CHANGE,
  VALIDATE_FORM,
  CLEAR_FORM,
};
