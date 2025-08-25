import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/", // adjust if needed
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor → attach token if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token && config.headers) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor → handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Check if 401 (unauthorized) and we haven’t retried yet
    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const refresh = localStorage.getItem("refresh_token");
        if (refresh) {
          const res = await axios.post("http://127.0.0.1:8000/api/auth/token/refresh/", {
            refresh,
          });

          localStorage.setItem("access_token", res.data.access);
          api.defaults.headers.common["Authorization"] = `Bearer ${res.data.access}`;

          // retry original request with new token
          return api(originalRequest);
        }
      } catch {
        // refresh failed → logout user
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        window.location.href = "/login"; // redirect
      }
    }

    return Promise.reject(error);
  }
);

export default api;
