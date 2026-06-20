import axios from "axios";

const api = axios.create({
  baseURL: "https://five0-50-renzo-garage-zrl9.onrender.com/api",
});

export default api;