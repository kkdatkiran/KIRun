import React, { useState } from "react";
import LoginForm from "./LoginForm";

import {
  LOGIN_FORM,
  SIGN_UP_FORM,
  FORGOT_PASSWORD,
  RESET_PASSWORD_FORM,
} from "./Constants";
import ForgotPassword from "./ForgotPassword";
import SignUp from "./SignUp";
import ForgotPasswordReset from "./ForgotPasswordReset";

export default function Login({ emailId, resetPasswordString }) {
  let [currentMode, setCurrentMode] = useState(
    emailId && resetPasswordString ? RESET_PASSWORD_FORM : LOGIN_FORM
  );

  let currentComponent = undefined;
  if (currentMode === SIGN_UP_FORM)
    currentComponent = <SignUp onModeChange={(v) => setCurrentMode(v)} />;
  else if (currentMode === FORGOT_PASSWORD)
    currentComponent = (
      <ForgotPassword onModeChange={(v) => setCurrentMode(v)} />
    );
  else if (currentMode === RESET_PASSWORD_FORM)
    currentComponent = (
      <ForgotPasswordReset
        userName={emailId}
        resetPasswordString={resetPasswordString}
      />
    );
  else currentComponent = <LoginForm onModeChange={(v) => setCurrentMode(v)} />;

  return (
    <div className="loginBack">
      <div className="login">
        <div className="loginLeft">
          <div className="title">KINETIC INSTRUCTION RUNTIME</div>
          <div className="smallRect" />
        </div>
        <div className="loginRight">
          <img className="loginLogo" src="/images/logok.png" alt="Logo big" />
          {currentComponent}
        </div>
      </div>
    </div>
  );
}
