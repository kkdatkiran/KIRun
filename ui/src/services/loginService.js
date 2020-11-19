import axios from "axios";

export async function login(loginBody) {
  return axios.post("/api/security/authenticate", loginBody);
}

export async function forgotPassword(userId, captcha, captchaString) {
  return axios.get("/api/security/user/resetPasswordMail", {
    params: { userId, captcha, captchaString },
  });
}
