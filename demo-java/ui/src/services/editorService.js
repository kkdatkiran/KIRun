import axios from "axios";

export function getServiceFunctions(name) {
  return axios.get("/api/function", name ? { params: { name } } : undefined);
}
