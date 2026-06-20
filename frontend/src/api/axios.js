import axios from "axios";

const api = axios.create({
  baseURL: "https://five0-50-renzo-garage.onrender.com/api",
});

export default api;