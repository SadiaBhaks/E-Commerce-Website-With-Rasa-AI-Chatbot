// src/api.js

const API_BASE = "https://backend-ecommerce-qdzy.onrender.com/api";

// -------------------- Backend API --------------------

// Get all items
export async function getItems() {
  const res = await fetch(`${API_BASE}/items`);
  return res.json();
}

// Add new item
export async function addItem(item) {
  const res = await fetch(`${API_BASE}/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item),
  });
  return res.json();
}

// Login
export async function loginUser(credentials) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  return res.json();
}

// Register
export async function registerUser(user) {
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  return res.json();
}


