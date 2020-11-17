import { ADD_MESSAGE } from "./../contexts/MessageContext";

export function handleMessage(dispatch, response) {
  const {
    data: { type, message, error: { errorCode, message: errorMessage } = {} },
  } = response;
  dispatch({
    type: ADD_MESSAGE,
    payload: { type, message: errorCode ? errorMessage : message, errorCode },
  });
}
