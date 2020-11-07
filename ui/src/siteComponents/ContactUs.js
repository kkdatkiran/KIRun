import React from "react";

export default function ContactUs() {
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
            data-ms-editor="true"
          />
          <div id="nameError" className="errorMessage">
            Please enter a valid name
          </div>
        </div>
        <div className="field">
          <label htmlFor="_replyto">
            Email<span className="mandatory">*</span>
          </label>
          <input type="email" id="_replyto" name="_replyto" />
          <div id="_replytoError" className="errorMessage">
            Please enter a valid email address
          </div>
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
            data-ms-editor="true"
          ></textarea>
          <div id="messageError" className="errorMessage">
            Please enter a valid message
          </div>
        </div>
        <div className="buttonfield">
          <button className="send" type="submit">
            Send
          </button>
        </div>
      </div>
    </>
  );
}
