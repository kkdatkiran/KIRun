import React, { useState } from "react";
import LoginForm from "./LoginForm";

import { LOGIN_FORM, FORGOT_PASSWORD } from "./Constants";
import ForgotPassword from "./ForgotPassword";

export default function Login() {
  let [currentMode, setCurrentMode] = useState(LOGIN_FORM);

  let currentComponent = undefined;
  if (currentMode === LOGIN_FORM)
    currentComponent = <LoginForm onModeChange={(v) => setCurrentMode(v)} />;
  else if (currentMode === FORGOT_PASSWORD)
    currentComponent = (
      <ForgotPassword onModeChange={(v) => setCurrentMode(v)} />
    );
  else currentComponent = <SignUp onModeChange={(v) => setCurrentMode(v)} />;
  return (
    <div className="loginBack">
      <div className="login">
        <div className="loginLeft"></div>
        <div className="loginRight">
          <img className="loginLogo" src="/images/logok.png" alt="Logo big" />
          {currentComponent}
        </div>
      </div>
    </div>
  );
}
