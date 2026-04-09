// src/services/publicacion.service.js
import api from '../api/axios';

/** 📄 Listar publicaciones (con búsqueda y paginación) */
export const listPosts = (params = {}) =>
    api.get('/posts', { params });

/** 📝 Crear publicación */
export const createPost = (data) =>
    api.post('/posts', data);

/** 🔍 Obtener una publicación */
export const getPost = (id) =>
    api.get(`/posts/${id}`);

/** ✏️ Actualizar publicación */
export const updatePost = (id, data) =>
    api.put(`/posts/${id}`, data);

/** 🗑️ Eliminar publicación */
export const deletePost = (id) =>
    api.delete(`/posts/${id}`);

/** 🔐 Login */
export const loginRequest = (data) =>
    api.post('/auth/login', data);

export const registerRequest = (data) =>
    api.post('/auth/register', data);