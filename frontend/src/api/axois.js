import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies(null, { path: '/' });

const axiosInstance = axios.create({
  baseURL:"http://localhost:5000/api/", // Replace with your backend URL
});

// Add a request interceptor to include the JWT token in headers
axiosInstance.interceptors.request.use(
  (config) => {
    const token =cookies.get('auth_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;