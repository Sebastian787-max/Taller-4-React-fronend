// src/api/axios.js
import axios from 'axios';

const api = axios.create({
    baseURL: 'https://taller-4-react-backend-7.onrender.com/api',
    headers: { 'Content-Type': 'application/json' }
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

export default api;
