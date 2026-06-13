import axios from "axios";

const API_URL = "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminToken") || localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  if (!(config.data instanceof FormData)) {
    config.headers["Content-Type"] = "application/json";
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/admin/login";
    }
    return Promise.reject(error);
  }
);

export const authService = {
  login: (credentials) => api.post("/auth/login", credentials),
  register: (userData) => api.post("/auth/register", userData),
  getMe: () => api.get("/auth/me"),
  updateProfile: (data) => api.put("/auth/profile", data),
  updatePassword: (data) => api.put("/auth/password", data),
};

export const tourService = {
  getAll: (params) => api.get("/tours", { params }),
  getOne: (id) => api.get(`/tours/${id}`),
  create: (data) => api.post("/tours", data),
  update: (id, data) => api.put(`/tours/${id}`, data),
  delete: (id) => api.delete(`/tours/${id}`),
  getFeatured: () => api.get("/tours/featured"),
  getTrending: () => api.get("/tours/trending"),
  uploadImage: (formData) => api.post("/tours/upload-image", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  }),
};

export const bookingService = {
  getAll: (params) => api.get("/bookings", { params }),
  getOne: (id) => api.get(`/bookings/${id}`),
  create: (data) => api.post("/bookings", data),
  update: (id, data) => api.put(`/bookings/${id}`, data),
  delete: (id) => api.delete(`/bookings/${id}`),
  getStats: () => api.get("/bookings/stats"),
  getRecent: () => api.get("/bookings/recent"),
  getMyBookings: (params) => api.get("/bookings/my-bookings", { params }),
};

export const testimonialService = {
  getAll: (params) => api.get("/testimonials", { params }),
  getOne: (id) => api.get(`/testimonials/${id}`),
  create: (data) => api.post("/testimonials", data),
  update: (id, data) => api.put(`/testimonials/${id}`, data),
  delete: (id) => api.delete(`/testimonials/${id}`),
  toggleStatus: (id) => api.put(`/testimonials/${id}/toggle`),
};

export const blogService = {
  getAll: (params) => api.get("/blogs", { params }),
  getOne: (id) => api.get(`/blogs/${id}`),
  create: (data) => api.post("/blogs", data),
  update: (id, data) => api.put(`/blogs/${id}`, data),
  delete: (id) => api.delete(`/blogs/${id}`),
  getFeatured: () => api.get("/blogs/featured"),
  uploadImage: (formData) => api.post("/blogs/upload-image", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  }),
};

export const categoryService = {
  getAll: (params) => api.get("/categories", { params }),
  getOne: (id) => api.get(`/categories/${id}`),
  create: (data) => api.post("/categories", data),
  update: (id, data) => api.put(`/categories/${id}`, data),
  delete: (id) => api.delete(`/categories/${id}`),
};

export const galleryService = {
  getAll: (params) => api.get("/gallery", { params }),
  getOne: (id) => api.get(`/gallery/${id}`),
  create: (data) => api.post("/gallery", data),
  update: (id, data) => api.put(`/gallery/${id}`, data),
  delete: (id) => api.delete(`/gallery/${id}`),
};

export const reviewService = {
  getAll: (params) => api.get("/reviews", { params }),
  getTourReviews: (tourId) => api.get(`/reviews/tour/${tourId}`),
  getOne: (id) => api.get(`/reviews/${id}`),
  create: (data) => api.post("/reviews", data),
  update: (id, data) => api.put(`/reviews/${id}`, data),
  delete: (id) => api.delete(`/reviews/${id}`),
  updateStatus: (id, status) => api.put(`/reviews/${id}/status`, { status }),
};

export const userService = {
  getAll: (params) => api.get("/users", { params }),
  getOne: (id) => api.get(`/users/${id}`),
  update: (id, data) => api.put(`/users/${id}`, data),
  delete: (id) => api.delete(`/users/${id}`),
  toggleStatus: (id) => api.put(`/users/${id}/toggle-status`),
  changePassword: (id, newPassword) => api.put(`/users/${id}/change-password`, { newPassword }),
};

export const couponService = {
  getAll: () => api.get("/coupons"),
  create: (data) => api.post("/coupons", data),
  update: (id, data) => api.put(`/coupons/${id}`, data),
  delete: (id) => api.delete(`/coupons/${id}`),
};

export const seoService = {
  get: () => api.get("/seo"),
  update: (data) => api.put("/seo", data),
};

export default api;
