import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

import { activateUser as activateUserService } from "../../../../services/loginService";

async function activateUser(emailId, activationString) {
  await activateUserService(emailId, activationString);
}

export default function ActivateUser({ emailId, activationString }) {
  const history = useHistory();

  useEffect(() => {
    if (!emailId || !activationString) return;
    activateUser(emailId, activationString);
    history.push("/demo");
  }, [emailId, activationString]);

  return <div className="fullscreenMessage title">Activating User ...</div>;
}
