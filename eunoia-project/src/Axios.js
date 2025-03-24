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
  } else{
    alert("Session expired. Please log in again.");
    localStorage.removeItem("authToken");
    localStorage.removeItem("userId");
    window.location.href = "/"; // Redirect to login page
    return Promise.reject(new Error("No authentication token found."));
  }
  return config;
}, (error) => Promise.reject(error));

export default api;
