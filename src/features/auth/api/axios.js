// src/api/axios.js
import axios from 'axios';
/**
* Cliente HTTP centralizado:
* - baseURL apunta al backend
* - headers comunes
*/
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
    headers: { 'Content-Type': 'application/json' }
});
// Interceptor para adjuntar el token si existe:
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});
export default api;