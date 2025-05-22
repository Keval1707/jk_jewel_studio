import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // send cookies automatically
});

// PRODUCT APIs
export const fetchProducts = () => api.get("/product");
export const fetchProductById = (id) => api.get(`/product/${id}`);
export const createProduct = (formData) =>
  api.post("/product", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const updateProduct = (id, data) =>
  api.put(`/product/${id}`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const deleteProduct = (id) => api.delete(`/product/${id}`);

// CATEGORY APIs
export const fetchCategories = () => api.get("/category");
export const fetchCategoryById = (id) => api.get(`/category/${id}`);
export const createCategory = (data) => api.post("/category", data);
export const updateCategory = (id, data) => api.put(`/category/${id}`, data);
export const deleteCategory = (id) => api.delete(`/category/${id}`);

// Order APIs
export const fetchOrderProducts = () => api.get("/order");

export const updateOrderProductStatus = (orderProductId, status) =>
  api.put(`/order/status/${orderProductId}`, { status });

// REPORTS
export const fetchReport = () => api.get("/report");

// AUTH APIs
export const login = (email, password) =>
  api.post("/admin/login", { email, password });
export const fetchAdminInfo = () => api.get("/admin/me");
export const logout = () => api.post("/admin/logout");

export default api;
