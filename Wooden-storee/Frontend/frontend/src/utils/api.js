// utils/api.js
import axios from "axios";

// ================= AUTH =================
export const authAPI = axios.create({
  baseURL: "http://localhost:5001/auth/api"
});

// ================= PRODUCT =================
export const productAPI = axios.create({
  baseURL: "http://localhost:5002/products/api"
});

// ================= ORDER =================
export const orderAPI = axios.create({
  baseURL: "http://localhost:5003/orders/api"
});

// ================= COMMON INTERCEPTOR =================

// 🔥 Function banaya reusable
const attachToken = (config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
};

// 🔥 Apply to all APIs
authAPI.interceptors.request.use(attachToken);
productAPI.interceptors.request.use(attachToken);
orderAPI.interceptors.request.use(attachToken);

// ================= GLOBAL ERROR HANDLER =================

const handleError = (error) => {
  if (error.response?.status === 401) {
    alert("Session expired, please login again 🔐");

    localStorage.clear();
    window.location.href = "/login";
  }

  return Promise.reject(error);
};

authAPI.interceptors.response.use(res => res, handleError);
productAPI.interceptors.response.use(res => res, handleError);
orderAPI.interceptors.response.use(res => res, handleError);