import React from "react";

import {
  useLoginContextState,
  useLoginContextDispatch,
  CHANGE_USERNAME,
  CHANGE_PASSWORD,
  VALIDATE_LOGIN_FORM,
  LOGIN,
} from "./../../../contexts/LoginContext";
import { login } from "./../../../services/loginService";
import { FORGOT_PASSWORD, SIGN_UP_FORM } from "./Constants";

async function loginNow(dispatch, loginBody) {
  if (!loginBody.userName || !loginBody.password) {
    dispatch({ type: VALIDATE_LOGIN_FORM });
    return;
  }

  const {
    data: { data: auth },
  } = await login({
    userId: loginBody.userName,
    password: loginBody.password,
  });
  window.localStorage.setItem("authToken", auth?.token);
  dispatch({ type: LOGIN, payload: auth });
}

export default function LoginForm(props) {
  const {
    userName,
    password,
    userNameError,
    passwordError,
  } = useLoginContextState();
  const dispatch = useLoginContextDispatch();

  const userNameErrorComponent = userNameError ? (
    <div className="errorMessage">{userNameError}</div>
  ) : undefined;
  const passwordErrorComponent = passwordError ? (
    <div className="errorMessage">{passwordError}</div>
  ) : undefined;

  return (
    <div className="form">
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
          onChange={(e) =>
            dispatch({ type: CHANGE_USERNAME, payload: e.target.value })
          }
        />
        {userNameErrorComponent}
      </div>
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
          onChange={(e) =>
            dispatch({ type: CHANGE_PASSWORD, payload: e.target.value })
          }
        />
        {passwordErrorComponent}
      </div>
      <div className="buttonfield">
        <button
          className="submit"
          type="submit"
          onClick={() =>
            loginNow(dispatch, {
              userName,
              password,
            })
          }
        >
          Login
        </button>
      </div>
      <div className="links">
        <button onClick={() => props.onModeChange(FORGOT_PASSWORD)}>
          forgot password
        </button>
        <button onClick={() => props.onModeChange(SIGN_UP_FORM)}>
          sign up a new user
        </button>
      </div>
    </div>
  );
}
