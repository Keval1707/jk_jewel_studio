import axios from "axios";

const API_BASE_URL = "http://145.223.18.5:9195";

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const fetchProducts = () => api.get("/product");
export const fetchProductById = (id) => api.get(`/product/${id}`);

export const fetchCategories = () => api.get("/category");
export const fetchCategoryById = (id) => api.get(`/category/${id}`);


export default api;
