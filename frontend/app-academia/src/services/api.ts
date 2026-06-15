import axios from 'axios';
import router from '@/router';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000',
  timeout: 10000,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('access_token');
      router.push('/login');
    }
    return Promise.reject(error);
  }
);

export default api;
