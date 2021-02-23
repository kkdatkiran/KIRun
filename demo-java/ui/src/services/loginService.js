import axios from "axios";

export async function login(loginBody) {
  return axios.post("/api/security/authenticate", loginBody);
}

export async function refreshLogin() {
  return axios.post("/api/security/refreshAuthentication");
}

export async function forgotPassword(userId, captcha, captchaString) {
  return axios.get("/api/security/user/resetPasswordMail", {
    params: { userId, captcha, captchaString },
  });
}

export async function forgotPasswordReset(resetBody) {
  return axios.post("/api/security/user/resetPassword", resetBody);
}

export async function signUpUser(userBody) {
  return axios.post("/api/registration", userBody);
}

export async function activateUser(email, activationCode) {
  return axios.get("/api/security/user/activateUser", {
    params: { userId: email, activationCode },
  });
}
