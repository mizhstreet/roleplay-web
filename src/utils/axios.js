import axios from "axios";

// axios.defaults.baseURL = "http://localhost:3000";
// axios.defaults.withCredentials = true;

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
  withCredentials: true,
});

export default api;
