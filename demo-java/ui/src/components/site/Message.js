import React, { useEffect } from "react";

import {
  DELETE_MESSAGE,
  CLEAR_OLD_MESSAGES,
  useMessageContextState,
  useMessageContextDispatch,
} from "./../../contexts/MessageContext";

export default function Message() {
  const messages = useMessageContextState();
  const dispatch = useMessageContextDispatch();

  useEffect(() => {
    const h = setInterval(() => dispatch({ type: CLEAR_OLD_MESSAGES }), 1000);
    return () => clearInterval(h);
  }, []);

  return (
    <>
      {messages.map((e, index) => (
        <div key={e.when} className={`messageContainer ${e.type}`} style={{ bottom: `${index * 80 + 15}px` }}>
          <div className="message" title={e.message}>
            {e.message ? `${e.message.substring(0, 180)}...` : ""}
            {e.errorCode ? ` (${e.errorCode})` : ""}
          </div>
          <div className="closeButton">
            <button onClick={() => dispatch({ type: DELETE_MESSAGE, payload: e.when })}>
              <img src="/images/close.png" alt="Remove Message" />
            </button>
          </div>
        </div>
      ))}
    </>
  );
}
