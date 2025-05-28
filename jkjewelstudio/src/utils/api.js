import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Log every request URL
api.interceptors.request.use((config) => {
  console.log("API Call:", config.baseURL + config.url);
  return config;
});

export const fetchProducts = () => api.get("/product");
export const fetchProductById = (id) => api.get(`/product/${id}`);

export const fetchCategories = () => api.get("/category");
export const fetchCategoryById = (id) => api.get(`/category/${id}`);

export const postPlaceOrder = (orderData) => api.post("/order/place", orderData);
export const contact = (contactData) => api.post("/contact", contactData);

export default api;
