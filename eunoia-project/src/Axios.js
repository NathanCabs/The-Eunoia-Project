import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:6543/", 
  withCredentials: true, // ✅ Allows cookies & authentication headers
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔹 Add a function to include the JWT token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken"); // ⬅️ Get the stored JWT token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // ⬅️ Attach token to every request
  }
  return config;
});

export default api;
