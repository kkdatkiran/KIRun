import axios from "axios";

export async function sendContactUs(contactUs) {
  return axios.post("/api/contactUs", contactUs);
}
