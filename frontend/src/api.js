// frontend/src/api.js
// central API client for making requests to the backend

import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000"
});

export default api;