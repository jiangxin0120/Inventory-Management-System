import axios from 'axios';

const api = axios.create({
  baseURL: 'http://54.211.167.136:80', 
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;