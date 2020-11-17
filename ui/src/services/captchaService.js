import axios from "axios";

export async function getCaptcha() {
  return axios.get("/api/captcha");
}
