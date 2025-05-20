import axios from "axios";

const API_BASE_URL = "http://localhost:5000";

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const fetchProducts = () => api.get("/product");
export const fetchProductById = (id) => api.get(`/product/${id}`);

export const fetchCategories = () => api.get("/category");
export const fetchCategoryById = (id) => api.get(`/category/${id}`);


export default api;
