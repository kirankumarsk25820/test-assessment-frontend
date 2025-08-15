// src/services/authService.js
import api from "./api";

// Register a new user
export const registerUser = async ({ name, email, password }) => {
  const response = await api.post("/auth/register", { name, email, password });
  // Save token locally if returned
  if (response.data.token) localStorage.setItem("token", response.data.token);
  return response.data;
};

// Login user
export const loginUser = async (email, password) => {
  const response = await api.post("/auth/login", { email, password });
  if (response.data.token) localStorage.setItem("token", response.data.token);
  return response.data;
};

// Logout user
export const logoutUser = async () => {
  localStorage.removeItem("token");
  // Optional: call backend logout endpoint
  try {
    await api.post("/auth/logout");
  } catch (err) {
    console.warn("Backend logout failed:", err);
  }
};

// Get current logged-in user
export const getCurrentUser = async () => {
  const response = await api.get("/auth/me");
  return response.data.user;
};
