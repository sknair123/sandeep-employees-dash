import axios from 'axios';

// Create axios instance with default config
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Log errors for debugging
    console.error('Request failed:', {
      url: originalRequest?.url,
      method: originalRequest?.method,
      status: error.response?.status,
      message: error.response?.data?.message || error.message
    });
    
    if (error.response?.status === 401) {
      // Don't retry if it's a login request or we've already tried to refresh
      if (originalRequest?.url?.includes('/login') || originalRequest?._retry) {
        localStorage.removeItem('token');
        return Promise.reject(error);
      }
      
      // Mark this request as retried
      if (originalRequest) {
        originalRequest._retry = true;
      }
      
      // Remove token and let components handle navigation
      localStorage.removeItem('token');
    }
    
    return Promise.reject({
      ...error,
      message: error.response?.data?.message || error.message,
      details: error.response?.data?.details || undefined
    });
  }
);

export default axiosInstance;
