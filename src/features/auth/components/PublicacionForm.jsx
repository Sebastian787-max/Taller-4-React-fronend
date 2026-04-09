import { useState } from 'react';
import { createPost } from '../services/Publicacion.service';
import { useAuth } from '../context/AuthContext';  // ← agregar

import {
    Box,
    TextField,
    Button,
    Typography
} from '@mui/material';

export default function PublicacionForm({ onSaved }) {

    const { token } = useAuth();  // ← agregar

    const [form, setForm] = useState({
        titulo: '',
        contenido: ''
    });

    const [errors, setErrors] = useState({});
    const [saving, setSaving] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(f => ({ ...f, [name]: value }));
        setErrors(prev => ({
            ...prev,
            [name]: value.trim() === '' ? 'Este campo es obligatorio' : ''
        }));
    };

    const isValid =
        form.titulo.trim() &&
        form.contenido.trim();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isValid) {
            return alert('Título y contenido son obligatorios');
        }

        try {
            setSaving(true);

            // Extraer autor_id del token JWT
            const payload = JSON.parse(atob(token.split('.')[1]));
            const autor_id = payload.uid;

            await createPost({
                autor_id,                          // ← agregar
                titulo: form.titulo.trim(),
                contenido: form.contenido.trim()
            });

            setForm({ titulo: '', contenido: '' });
            setErrors({});
            onSaved?.();
            alert('Post creado correctamente 🔥');

        } catch (err) {
            console.error(err);
            if (err.response?.data?.errors) {
                alert(err.response.data.errors.map(e => e.msg).join('\n'));
            } else {
                alert('Error creando post');
            }
        } finally {
            setSaving(false);
        }
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                p: 3,
                borderRadius: 3,
                boxShadow: 3,
                mb: 4
            }}
        >
            <Typography variant="h6" fontWeight="bold" mb={2}>
                Nueva Publicación
            </Typography>

            <TextField
                name="titulo"
                label="Título *"
                fullWidth
                value={form.titulo}
                onChange={handleChange}
                error={!!errors.titulo}
                helperText={errors.titulo}
                sx={{ mb: 2 }}
            />

            <TextField
                name="contenido"
                label="Contenido *"
                fullWidth
                multiline
                rows={4}
                value={form.contenido}
                onChange={handleChange}
                error={!!errors.contenido}
                helperText={errors.contenido}
            />

            <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={!isValid || saving}
                sx={{
                    mt: 3,
                    height: '45px',
                    borderRadius: 2,
                    fontWeight: 'bold',
                    backgroundColor: '#0eaa23'
                }}
            >
                {saving ? 'Guardando...' : 'Publicar'}
            </Button>
        </Box>
    );
}