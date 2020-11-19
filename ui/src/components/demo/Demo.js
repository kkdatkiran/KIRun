import React from "react";

import { useLoginContextState } from "./../../contexts/LoginContext";
import Login from "./login/Login";

export default function Docs() {
  const { auth } = useLoginContextState();

  if (!auth) return <Login />;

  return <div></div>;
}
