import React, { useEffect } from "react";

import {
  useLoginContextState,
  useLoginContextDispatch,
  CHANGE_USERNAME,
  CHANGE_PASSWORD,
  CHANGE_FIRST_NAME,
  CHANGE_LAST_NAME,
  CHANGE_RETYPE_PASSWORD,
  VALIDATE_SIGN_UP_FORM,
  CHANGE_SIGN_UP_CAPTCHA_DETAILS,
  CHANGE_SIGN_UP_CAPTCHA,
  CLEAR_FORM,
} from "../../../../contexts/LoginContext";
import { getCaptcha } from "./../../../../services/captchaService";
import { signUpUser as signUpUserService } from "../../../../services/loginService";
import { LOGIN_FORM } from "./Constants";

async function signUpUserLocal(dispatch, signUpUser) {
  const {
    user: { email, password, retypePassword, firstName, lastName },
    captcha,
  } = signUpUser;
  if (!email || !captcha || !password || !retypePassword || !firstName || !lastName || password !== retypePassword) {
    dispatch({ type: VALIDATE_SIGN_UP_FORM });
    return;
  }
  try {
    await signUpUserService(signUpUser);
    dispatch({ type: CLEAR_FORM });
  } finally {
    refreshCapthca(dispatch);
  }
}

async function getData(dispatch) {
  let { data: { data } = {} } = await getCaptcha();
  dispatch({ type: CHANGE_SIGN_UP_CAPTCHA_DETAILS, payload: data });
}

function refreshCapthca(dispatch) {
  getData(dispatch);
}

export default function ForgotPassword(props) {
  const {
    userName,
    userNameError,
    password,
    passwordError,
    retypePassword,
    retypePasswordError,
    firstName,
    firstNameError,
    lastName,
    lastNameError,
    signUpCaptcha,
    signUpCaptchaCaptchaError,
    signUpCaptchaDetails: { captchaString, captchaImageURL } = {},
  } = useLoginContextState();
  const dispatch = useLoginContextDispatch();

  useEffect(() => {
    getData(dispatch);
  }, []);

  const userNameErrorComponent = userNameError ? <div className="errorMessage">{userNameError}</div> : undefined;

  const passwordErrorComponent = passwordError ? <div className="errorMessage">{passwordError}</div> : undefined;

  const retypePasswordErrorComponent = retypePasswordError ? (
    <div className="errorMessage">{retypePasswordError}</div>
  ) : undefined;

  const firstNameErrorComponent = firstNameError ? <div className="errorMessage">{firstNameError}</div> : undefined;

  const lastNameErrorComponent = lastNameError ? <div className="errorMessage">{lastNameError}</div> : undefined;

  const captchaErrorComponent = signUpCaptchaCaptchaError ? (
    <div className="errorMessage">{signUpCaptchaCaptchaError}</div>
  ) : undefined;

  return (
    <div className="signUp form">
      <div className="field">
        <label htmlFor="userName">
          User name / Email <span className="mandatory">*</span>
        </label>
        <input
          type="email"
          id="userName"
          name="userName"
          spellCheck="false"
          value={userName}
          onChange={(e) => dispatch({ type: CHANGE_USERNAME, payload: e.target.value })}
        />
        {userNameErrorComponent}
      </div>
      <div className="twoFields">
        <div className="field">
          <label htmlFor="password">
            Password <span className="mandatory">*</span>
          </label>
          <input
            type="password"
            id="password"
            name="password"
            spellCheck="false"
            value={password}
            onChange={(e) => dispatch({ type: CHANGE_PASSWORD, payload: e.target.value })}
          />
          {passwordErrorComponent}
        </div>
        <div className="field">
          <label htmlFor="retypePassword">
            Re-type Password <span className="mandatory">*</span>
          </label>
          <input
            type="password"
            id="retypePassword"
            name="retypePassword"
            spellCheck="false"
            value={retypePassword}
            onChange={(e) =>
              dispatch({
                type: CHANGE_RETYPE_PASSWORD,
                payload: e.target.value,
              })
            }
          />
          {retypePasswordErrorComponent}
        </div>
      </div>
      <div className="twoFields">
        <div className="field">
          <label htmlFor="firstName">
            First name <span className="mandatory">*</span>
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            spellCheck="false"
            value={firstName}
            onChange={(e) => dispatch({ type: CHANGE_FIRST_NAME, payload: e.target.value })}
          />
          {firstNameErrorComponent}
        </div>
        <div className="field">
          <label htmlFor="lastName">
            Last name <span className="mandatory">*</span>
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            spellCheck="false"
            value={lastName}
            onChange={(e) => dispatch({ type: CHANGE_LAST_NAME, payload: e.target.value })}
          />
          {lastNameErrorComponent}
        </div>
      </div>
      <div className="field">
        <label htmlFor="captcha">
          Captcha <span className="mandatory">*</span>
        </label>
        <div className="alignTop">
          <img src={captchaImageURL} alt="Captcha" className="captchImage" />
          <button href="#" onClick={() => refreshCapthca(dispatch)}>
            <img alt="refresh" src="/images/refresh.png" />
          </button>
        </div>
        <input
          type="text"
          id="captcha"
          name="captcha"
          spellCheck="false"
          value={signUpCaptcha}
          onChange={(e) =>
            dispatch({
              type: CHANGE_SIGN_UP_CAPTCHA,
              payload: e.target.value,
            })
          }
        />
        {captchaErrorComponent}
      </div>
      <div className="buttonfield">
        <button
          className="submit"
          type="submit"
          onClick={() =>
            signUpUserLocal(dispatch, {
              user: {
                email: userName,
                password,
                retypePassword,
                firstName,
                lastName,
              },
              captcha: signUpCaptcha,
              captchaString,
            })
          }
        >
          SIGN UP
        </button>
      </div>
      <div className="links">
        <button onClick={() => props.onModeChange(LOGIN_FORM)}>login</button>
      </div>
    </div>
  );
}
