// src/api/axios.js
import axios from 'axios';
/**
* Cliente HTTP centralizado:
* - baseURL apunta al backend
* - headers comunes
*/
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'https://taller-4-react-backend-7.onrender.com/api',
    headers: { 'Content-Type': 'application/json' }
});
// Interceptor para adjuntar el token si existe:
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});
export default api;
