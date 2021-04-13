import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function close(onButtonClick, closeButtonName) {
  return (e) => {
    e.stopPropagation();
    onButtonClick({ button: closeButtonName ?? "close" });
  };
}

export default function Popup({ buttons, title, children, onButtonClick, closeButtonName }) {
  return (
    <div className="popupBack" role="button" tabIndex="0" onClick={close(onButtonClick, closeButtonName)} onKeyUp={() => {}}>
      <div className="popup" role="button" tabIndex="0" onClick={(e) => e.stopPropagation()} onKeyUp={() => {}}>
        <div className="header">
          <div className="title">{title}</div>
          <div className="buttonContainer">
            <button onClick={close(onButtonClick, closeButtonName)}>
              <FontAwesomeIcon icon="times-circle" />
            </button>
          </div>
        </div>
        <div className="body">{children}</div>
        <div className="popupFooter">
          {buttons.map((e) => (
            <button
              key={e}
              onClick={(event) => {
                event.stopPropagation();
                onButtonClick({ button: e });
              }}
            >
              {e}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
