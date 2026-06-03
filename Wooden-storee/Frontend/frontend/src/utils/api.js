// utils/api.js
import axios from "axios";

// ================= AUTH =================
export const authAPI = axios.create({
  baseURL: "https://auth-service-15tn.onrender.com/auth/api",
});

// ================= PRODUCT =================
export const productAPI = axios.create({
  baseURL: "https://product-service-8r0c.onrender.com/products/api",
});

// ================= ORDER =================
export const orderAPI = axios.create({
  baseURL: "https://order-service-ry2o.onrender.com/orders/api",
});

// ================= COMMON INTERCEPTOR =================

const attachToken = (config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
};

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

authAPI.interceptors.response.use((res) => res, handleError);
productAPI.interceptors.response.use((res) => res, handleError);
orderAPI.interceptors.response.use((res) => res, handleError);