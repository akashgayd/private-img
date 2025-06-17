import axios from 'axios';
import Cookies from 'js-cookie';

// Create axios instance with base URL
const api = axios.create({
  baseURL: 'https://secrete-96mz.onrender.com/api/v1',
  timeout: 10000, // 10 seconds
});

// Request interceptor (adds JWT token from cookies to headers)
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor (handles 401 errors and removes cookie)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      Cookies.remove('token'); // Remove token from cookies
      window.location.href = '/login'; // Redirect to login
    }
    return Promise.reject(error);
  }
);

export default api;
