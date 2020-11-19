import React from "react";

const LoginStateContext = React.createContext();
const LoginDispatchContext = React.createContext();

const defaultState = {
  userName: "",
  password: "",
  auth: undefined,
  forgotPasswordCaptcha: "",
  signUpCaptcha: "",
  forgotPasswordCaptchaDetails: undefined,
  signUpCaptchaDetails: undefined,
};

const CHANGE_USERNAME = 1;
const CHANGE_PASSWORD = 2;
const LOGIN = 3;
const LOGOUT = 4;
const VALIDATE_LOGIN_FORM = 5;
const CLEAR_FORM = 6;
const VALIDATE_FORGOT_PASSWORD_FORM = 7;
const CHANGE_FORGOT_PASSWORD_CAPTCHA = 8;
const CHANGE_SIGN_UP_PASSWORD_CAPTCHA = 9;
const CHANGE_FORGOT_PASSWORD_CAPTCHA_DETAILS = 10;
const CHANGE_SIGN_UP_PASSWORD_CAPTCHA_DETAILS = 11;

function loginReducer(state = defaultState, action) {
  if (!action || !action.type) return;

  switch (action.type) {
    case CHANGE_USERNAME:
      return { ...state, userName: action.payload };
    case CHANGE_PASSWORD:
      return { ...state, password: action.payload };
    case CHANGE_FORGOT_PASSWORD_CAPTCHA:
      return { ...state, forgotPasswordCaptcha: action.payload };
    case CHANGE_SIGN_UP_PASSWORD_CAPTCHA:
      return { ...state, signUpCaptcha: action.payload };
    case CHANGE_FORGOT_PASSWORD_CAPTCHA_DETAILS:
      return { ...state, forgotPasswordCaptchaDetails: action.payload };
    case CHANGE_SIGN_UP_PASSWORD_CAPTCHA_DETAILS:
      return { ...state, signUpCaptchaDetails: action.payload };
    case LOGIN:
      return { ...state, auth: action.payload, userName: "", password: "" };
    case LOGOUT:
    case CLEAR_FORM:
      return defaultState;
    case VALIDATE_FORGOT_PASSWORD_FORM: {
      let returnState = { ...state };

      if (!returnState.userName)
        returnState.userNameError = "User name cannot be empty.";
      else delete returnState.userNameError;

      if (!returnState.forgotPasswordCaptcha)
        returnState.forgotPasswordCaptchaError = "Captcha cannot be empty.";
      else delete returnState.forgotPasswordCaptchaError;

      return returnState;
    }
    case VALIDATE_LOGIN_FORM: {
      let returnState = { ...state };
      if (!returnState.userName)
        returnState.userNameError = "User name cannot be empty.";
      else delete returnState.userNameError;

      if (!returnState.password)
        returnState.passwordError = "Password cannot be empty.";
      else delete returnState.password;

      return returnState;
    }
    default:
      return state;
  }
}

function LoginContextProvider({ children }) {
  const [state, dispatch] = React.useReducer(loginReducer, defaultState);

  return (
    <LoginStateContext.Provider value={state}>
      <LoginDispatchContext.Provider value={dispatch}>
        {children}
      </LoginDispatchContext.Provider>
    </LoginStateContext.Provider>
  );
}

function useLoginContextState() {
  const ctx = React.useContext(LoginStateContext);
  if (!ctx)
    throw new Error(
      "Unable create context for login context. Please use in components wrapped in LoginContextProvider."
    );
  return ctx;
}

function useLoginContextDispatch() {
  const ctx = React.useContext(LoginDispatchContext);
  if (!ctx)
    throw new Error(
      "Unable create context for login context. Please use in components wrapped in LoginContextProvider."
    );
  return ctx;
}

export {
  LoginContextProvider,
  useLoginContextState,
  useLoginContextDispatch,
  CHANGE_USERNAME,
  CHANGE_PASSWORD,
  VALIDATE_LOGIN_FORM,
  CLEAR_FORM,
  LOGIN,
  LOGOUT,
  VALIDATE_FORGOT_PASSWORD_FORM,
  CHANGE_FORGOT_PASSWORD_CAPTCHA,
  CHANGE_FORGOT_PASSWORD_CAPTCHA_DETAILS,
  CHANGE_SIGN_UP_PASSWORD_CAPTCHA,
  CHANGE_SIGN_UP_PASSWORD_CAPTCHA_DETAILS,
};
