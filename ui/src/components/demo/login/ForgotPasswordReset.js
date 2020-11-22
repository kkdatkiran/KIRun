import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

import {
  useLoginContextState,
  useLoginContextDispatch,
  CHANGE_PASSWORD,
  CHANGE_RETYPE_PASSWORD,
  VALIDATE_FORGOT_PASSWORD_RESET_FORM,
  CHANGE_FORGOT_PASSWORD_RESET_CAPTCHA_DETAILS,
  CHANGE_FORGOT_PASSWORD_RESET_CAPTCHA,
  CLEAR_FORM,
} from "../../../contexts/LoginContext";
import { getCaptcha } from "../../../services/captchaService";
import { forgotPasswordReset } from "../../../services/loginService";

async function resetPasswordLocal(dispatch, history, resetRequest) {
  const { password, retypePassword, captcha } = resetRequest;
  if (!captcha || !password || !retypePassword || password !== retypePassword) {
    dispatch({ type: VALIDATE_FORGOT_PASSWORD_RESET_FORM });
    return;
  }
  try {
    await forgotPasswordReset(resetRequest);
    dispatch({ type: CLEAR_FORM });
    history.push("/demo");
  } finally {
    refreshCapthca(dispatch);
  }
}

async function getData(dispatch) {
  let { data: { data } = {} } = await getCaptcha();
  dispatch({
    type: CHANGE_FORGOT_PASSWORD_RESET_CAPTCHA_DETAILS,
    payload: data,
  });
}

function refreshCapthca(dispatch) {
  getData(dispatch);
}

export default function ForgotPasswordReset({ userName, resetPasswordString }) {
  const {
    password,
    passwordError,
    retypePassword,
    retypePasswordError,
    resetCaptcha,
    resetCaptchaCaptchaError,
    resetCaptchaDetails: { captchaString, captchaImageURL } = {},
  } = useLoginContextState();
  const dispatch = useLoginContextDispatch();

  useEffect(() => {
    getData(dispatch);
  }, []);

  const history = useHistory();

  const passwordErrorComponent = passwordError ? (
    <div className="errorMessage">{passwordError}</div>
  ) : undefined;

  const retypePasswordErrorComponent = retypePasswordError ? (
    <div className="errorMessage">{retypePasswordError}</div>
  ) : undefined;

  const captchaErrorComponent = resetCaptchaCaptchaError ? (
    <div className="errorMessage">{resetCaptchaCaptchaError}</div>
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
        />
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
          value={resetCaptcha}
          onChange={(e) =>
            dispatch({
              type: CHANGE_FORGOT_PASSWORD_RESET_CAPTCHA,
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
            resetPasswordLocal(dispatch, history, {
              userId: userName,
              password,
              retypePassword,
              resetPasswordString,
              captcha: resetCaptcha,
              captchaString,
            })
          }
        >
          RESET PASSWORD
        </button>
      </div>
    </div>
  );
}
