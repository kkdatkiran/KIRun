import React, { useEffect } from "react";

import {
  useContactContextState,
  useContactContextDispatch,
  ADD_CAPTCHA_INFO,
  NAME_CHANGE,
  EMAIL_CHANGE,
  MESSAGE_CHANGE,
  CAPTCHA_CHANGE,
  VALIDATE_FORM,
  CLEAR_FORM,
} from "../../contexts/ContactContext";

import { getCaptcha } from "./../../services/captchaService";
import { sendContactUs } from "./../../services/contactService";

async function send(dispatch, contactUs) {
  const {
    contactUs: { name, email, message },
    captcha,
  } = contactUs;

  if (!name || !email || !message || !captcha) {
    dispatch({ type: VALIDATE_FORM });
    return;
  }

  await sendContactUs(contactUs);
  dispatch({ type: CLEAR_FORM });
  getData(dispatch);
}

async function getData(dispatch) {
  let { data: { data } = {} } = await getCaptcha();
  dispatch({ type: ADD_CAPTCHA_INFO, payload: data });
}

function refreshCapthca(dispatch) {
  getData(dispatch);
}

export default function ContactUs() {
  const dispatch = useContactContextDispatch();
  const {
    captchaImageURL,
    name = "",
    nameError,
    email = "",
    emailError,
    message = "",
    messageError,
    captcha = "",
    captchaError,
    captchaString,
  } = useContactContextState();

  useEffect(() => {
    getData(dispatch);
  }, []);

  let nameErrorMsg, emailErrorMsg, messageErrorMsg, captchaErrorMsg;
  if (nameError) nameErrorMsg = <div className="errorMessage"> {nameError} </div>;
  if (emailError) emailErrorMsg = <div className="errorMessage"> {emailError} </div>;
  if (messageError) messageErrorMsg = <div className="errorMessage"> {messageError} </div>;
  if (captchaError) captchaErrorMsg = <div className="errorMessage"> {captchaError} </div>;

  return (
    <>
      <h1>CONTACT</h1>
      <p>
        <br />
        Please leave a message and will get back to you at the earliest.
      </p>
      <div className="form">
        <div className="field">
          <label htmlFor="name">
            Name<span className="mandatory">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            spellCheck="false"
            value={name}
            onChange={(e) => dispatch({ type: NAME_CHANGE, payload: e.target.value })}
          />
          {nameErrorMsg}
        </div>
        <div className="field">
          <label htmlFor="_replyto">
            Email<span className="mandatory">*</span>
          </label>
          <input
            type="email"
            id="_replyto"
            name="_replyto"
            value={email}
            onChange={(e) => dispatch({ type: EMAIL_CHANGE, payload: e.target.value })}
          />
          {emailErrorMsg}
        </div>
        <div className="field">
          <label htmlFor="message">
            Message<span className="mandatory">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows="6"
            spellCheck="false"
            value={message}
            onChange={(e) => dispatch({ type: MESSAGE_CHANGE, payload: e.target.value })}
          ></textarea>
          {messageErrorMsg}
        </div>
        <div className="field">
          <label htmlFor="captcha">
            Captcha<span className="mandatory">*</span>
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
            value={captcha}
            onChange={(e) => dispatch({ type: CAPTCHA_CHANGE, payload: e.target.value })}
          />
          {captchaErrorMsg}
        </div>
        <div className="buttonfield">
          <button
            className="submit"
            type="submit"
            onClick={() =>
              send(dispatch, {
                contactUs: { name, email, message },
                captcha,
                captchaString,
              })
            }
          >
            Send
          </button>
        </div>
      </div>
    </>
  );
}
