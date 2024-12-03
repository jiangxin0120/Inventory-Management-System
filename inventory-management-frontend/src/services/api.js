import axios from 'axios';

const api = axios.create({
  baseURL: 'http://54.211.167.136',
});

// Add request interceptor for authentication and debugging
api.interceptors.request.use(request => {
  const token = localStorage.getItem('token');
  if (token) {
    request.headers.Authorization = `Bearer ${token}`;
  }
  console.log('Starting Request:', request);
  return request;
});

// Add response interceptor for debugging
api.interceptors.response.use(response => {
  console.log('Response:', response);
  return response;
}, error => {
  console.error('API Error:', error);
  return Promise.reject(error);
});

export default api;
