import React from "react";

export default function Logo(props) {
  return (
    <div className={`${props.isDemo ? "demoLogo " : ""}logo`}>
      <a href="/">
        <img src="/images/logoksmall.png" alt="logo"></img>
      </a>
    </div>
  );
}
