import React, { useEffect } from "react";

import {
  useLoginContextState,
  useLoginContextDispatch,
  CHANGE_USERNAME,
  VALIDATE_FORGOT_PASSWORD_FORM,
  CHANGE_FORGOT_PASSWORD_CAPTCHA_DETAILS,
  CHANGE_FORGOT_PASSWORD_CAPTCHA,
  CLEAR_FORM,
} from "../../../../contexts/LoginContext";
import { getCaptcha } from "./../../../../services/captchaService";
import { forgotPassword as forgotPasswordServiceCall } from "../../../../services/loginService";
import { LOGIN_FORM } from "./Constants";

async function forgotPassword(dispatch, userName, captcha, captchaString) {
  if (!userName || !captcha) {
    dispatch({ type: VALIDATE_FORGOT_PASSWORD_FORM });
    return;
  }
  try {
    await forgotPasswordServiceCall(userName, captcha, captchaString);
    dispatch({ type: CLEAR_FORM });
  } finally {
    refreshCapthca(dispatch);
  }
}

async function getData(dispatch) {
  let { data: { data } = {} } = await getCaptcha();
  dispatch({ type: CHANGE_FORGOT_PASSWORD_CAPTCHA_DETAILS, payload: data });
}

function refreshCapthca(dispatch) {
  getData(dispatch);
}

export default function ForgotPassword(props) {
  const {
    userName,
    userNameError,
    forgotPasswordCaptcha,
    forgotPasswordCaptchaError,
    forgotPasswordCaptchaDetails: { captchaString, captchaImageURL } = {},
  } = useLoginContextState();
  const dispatch = useLoginContextDispatch();

  useEffect(() => {
    getData(dispatch);
  }, []);

  const userNameErrorComponent = userNameError ? <div className="errorMessage">{userNameError}</div> : undefined;

  const captchaErrorComponent = forgotPasswordCaptchaError ? (
    <div className="errorMessage">{forgotPasswordCaptchaError}</div>
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
          onChange={(e) => dispatch({ type: CHANGE_USERNAME, payload: e.target.value })}
        />
        {userNameErrorComponent}
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
          value={forgotPasswordCaptcha}
          onChange={(e) =>
            dispatch({
              type: CHANGE_FORGOT_PASSWORD_CAPTCHA,
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
          onClick={() => forgotPassword(dispatch, userName, forgotPasswordCaptcha, captchaString)}
        >
          Forgot Password
        </button>
      </div>
      <div className="links">
        <button onClick={() => props.onModeChange(LOGIN_FORM)}>login</button>
      </div>
    </div>
  );
}
