import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use((config) => {
  try {
    const auth = JSON.parse(localStorage.getItem("user"));
    const token = auth?.token || auth?.user?.token; // учитываем обе структуры
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (err) {
    console.warn("Token parse error:", err);
  }

  return config;
});

export default instance;
