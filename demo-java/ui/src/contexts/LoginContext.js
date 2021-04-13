import React from "react";

const LoginStateContext = React.createContext();
const LoginDispatchContext = React.createContext();

const defaultState = {
  userName: "",
  password: "",
  firstName: "",
  lastName: "",
  retypePassword: "",
  auth: undefined,
  forgotPasswordCaptcha: "",
  signUpCaptcha: "",
  forgotPasswordCaptchaDetails: undefined,
  signUpCaptchaDetails: undefined,
  resetCaptcha: "",
  resetCaptchaDetails: undefined,
};

const CHANGE_USERNAME = 300001;
const CHANGE_PASSWORD = 300002;
const LOGIN = 300003;
const LOGOUT = 300004;
const VALIDATE_LOGIN_FORM = 300005;
const CLEAR_FORM = 300006;
const VALIDATE_FORGOT_PASSWORD_FORM = 300007;
const CHANGE_FORGOT_PASSWORD_CAPTCHA = 300008;
const CHANGE_SIGN_UP_CAPTCHA = 300009;
const CHANGE_FORGOT_PASSWORD_CAPTCHA_DETAILS = 3000010;
const CHANGE_SIGN_UP_CAPTCHA_DETAILS = 3000011;
const VALIDATE_SIGN_UP_FORM = 3000012;
const CHANGE_FIRST_NAME = 3000013;
const CHANGE_LAST_NAME = 3000014;
const CHANGE_RETYPE_PASSWORD = 3000015;
const VALIDATE_FORGOT_PASSWORD_RESET_FORM = 3000016;
const CHANGE_FORGOT_PASSWORD_RESET_CAPTCHA_DETAILS = 3000017;
const CHANGE_FORGOT_PASSWORD_RESET_CAPTCHA = 3000018;

function loginReducer(state = defaultState, action) {
  if (!action || !action.type) return;

  switch (action.type) {
    case CHANGE_USERNAME:
      return { ...state, userName: action.payload };
    case CHANGE_FIRST_NAME:
      return { ...state, firstName: action.payload };
    case CHANGE_LAST_NAME:
      return { ...state, lastName: action.payload };
    case CHANGE_PASSWORD:
      return { ...state, password: action.payload };
    case CHANGE_RETYPE_PASSWORD:
      return { ...state, retypePassword: action.payload };
    case CHANGE_FORGOT_PASSWORD_CAPTCHA:
      return { ...state, forgotPasswordCaptcha: action.payload };
    case CHANGE_SIGN_UP_CAPTCHA:
      return { ...state, signUpCaptcha: action.payload };
    case CHANGE_FORGOT_PASSWORD_CAPTCHA_DETAILS:
      return { ...state, forgotPasswordCaptchaDetails: action.payload };
    case CHANGE_FORGOT_PASSWORD_RESET_CAPTCHA:
      return { ...state, resetCaptcha: action.payload };
    case CHANGE_FORGOT_PASSWORD_RESET_CAPTCHA_DETAILS:
      return { ...state, resetCaptchaDetails: action.payload };
    case CHANGE_SIGN_UP_CAPTCHA_DETAILS:
      return { ...state, signUpCaptchaDetails: action.payload };
    case LOGIN:
      return { ...state, auth: action.payload, userName: "", password: "" };
    case LOGOUT:
    case CLEAR_FORM:
      return defaultState;
    case VALIDATE_FORGOT_PASSWORD_FORM: {
      let returnState = { ...state };

      if (!returnState.userName) returnState.userNameError = "User name cannot be empty.";
      else delete returnState.userNameError;

      if (!returnState.forgotPasswordCaptcha) returnState.forgotPasswordCaptchaError = "Captcha cannot be empty.";
      else delete returnState.forgotPasswordCaptchaError;

      return returnState;
    }
    case VALIDATE_LOGIN_FORM: {
      let returnState = { ...state };
      if (!returnState.userName) returnState.userNameError = "User name cannot be empty.";
      else delete returnState.userNameError;

      if (!returnState.password) returnState.passwordError = "Password cannot be empty.";
      else delete returnState.password;

      return returnState;
    }
    case VALIDATE_FORGOT_PASSWORD_RESET_FORM: {
      let returnState = { ...state };
      if (!returnState.userName) returnState.userNameError = "User name cannot be empty.";
      else delete returnState.userNameError;

      if (!returnState.password) returnState.passwordError = "Password cannot be empty.";
      else delete returnState.passwordError;

      if (returnState.password !== returnState.retypePassword)
        returnState.retypePasswordError = "Password should match with retyped password.";
      else delete returnState.retypePasswordError;

      if (!returnState.resetCaptcha) returnState.resetCaptchaCaptchaError = "Captcha cannot be empty.";
      else delete returnState.resetCaptchaCaptchaError;

      return returnState;
    }
    case VALIDATE_SIGN_UP_FORM: {
      let returnState = { ...state };
      if (!returnState.userName) returnState.userNameError = "User name cannot be empty.";
      else delete returnState.userNameError;

      if (!returnState.password) returnState.passwordError = "Password cannot be empty.";
      else delete returnState.passwordError;

      if (returnState.password !== returnState.retypePassword)
        returnState.retypePasswordError = "Password should match with retyped password.";
      else delete returnState.retypePasswordError;

      if (!returnState.firstName) returnState.firstNameError = "First name cannot be empty.";
      else delete returnState.firstNameError;

      if (!returnState.lastName) returnState.lastNameError = "Last name cannot be empty.";
      else delete returnState.lastNameError;

      if (!returnState.signUpCaptcha) returnState.signUpCaptchaError = "Captcha cannot be empty.";
      else delete returnState.signUpCaptchaError;

      return returnState;
    }
    default:
      return state;
  }
}

function LoginContextProvider({ children, auth }) {
  let firstState = { ...defaultState, auth };
  const [state, dispatch] = React.useReducer(loginReducer, firstState);

  return (
    <LoginStateContext.Provider value={state}>
      <LoginDispatchContext.Provider value={dispatch}>{children}</LoginDispatchContext.Provider>
    </LoginStateContext.Provider>
  );
}

function useLoginContextState() {
  const ctx = React.useContext(LoginStateContext);
  if (!ctx) throw new Error("Unable create context for login context. Please use in components wrapped in LoginContextProvider.");
  return ctx;
}

function useLoginContextDispatch() {
  const ctx = React.useContext(LoginDispatchContext);
  if (!ctx) throw new Error("Unable create context for login context. Please use in components wrapped in LoginContextProvider.");
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
  VALIDATE_SIGN_UP_FORM,
  CHANGE_FORGOT_PASSWORD_CAPTCHA,
  CHANGE_FORGOT_PASSWORD_CAPTCHA_DETAILS,
  CHANGE_SIGN_UP_CAPTCHA,
  CHANGE_SIGN_UP_CAPTCHA_DETAILS,
  CHANGE_FIRST_NAME,
  CHANGE_LAST_NAME,
  CHANGE_RETYPE_PASSWORD,
  VALIDATE_FORGOT_PASSWORD_RESET_FORM,
  CHANGE_FORGOT_PASSWORD_RESET_CAPTCHA_DETAILS,
  CHANGE_FORGOT_PASSWORD_RESET_CAPTCHA,
};
