import axios from "axios";

const API_BASE_URL = "http://localhost:5000";

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const fetchProducts = () => api.get("/product");
export const fetchProductById = (id) => api.get(`/product/${id}`);
export const createProduct = (formData) =>
  api.post("/product", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const updateProduct = (id, data) =>
  api.put(`/product/${id}`, data ,{
    headers: { "Content-Type": "multipart/form-data" },
  });
export const deleteProduct = (id) => api.delete(`/product/${id}`);

export const fetchCategories = () => api.get("/category");
export const fetchCategoryById = (id) => api.get(`/category/${id}`);
export const createCategory = (data) => api.post("/category", data);
export const updateCategory = (id, data) => api.put(`/category/${id}`, data);
export const deleteCategory = (id) => api.delete(`/category/${id}`);
export const fetchReport = () => api.get("/report");
export const login = (email, password) => api.post("/login", { email, password });


export default api;
