import { useState } from 'react';
import { deletePost, updatePost } from '../services/Publicacion.service';

import {
    TableRow,
    TableCell,
    TextField,
    IconButton,
    Tooltip
} from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';

export default function PublicacionItem({ ap, onChange }) {

    const [edit, setEdit] = useState(false);
    const [form, setForm] = useState(ap);
    const [saving, setSaving] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;

        // 🔥 manejar objetos anidados (stats)
        if (name === 'likes' || name === 'compartido') {
            setForm(f => ({
                ...f,
                stats: {
                    ...f.stats,
                    [name]: value
                }
            }));
        } else {
            setForm(f => ({ ...f, [name]: value }));
        }
    };

    const handleSave = async () => {
        try {
            setSaving(true);

            await updatePost(ap._id, form);

            setEdit(false);
            onChange?.();

        } catch (err) {
            console.error(err);
            alert('Error actualizando publicación');
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async () => {
        if (!window.confirm('¿Eliminar publicación?')) return;

        try {
            await deletePost(ap._id);
            onChange?.();
        } catch (err) {
            console.error(err);
            alert('Error eliminando');
        }
    };

    const handleCancel = () => {
        setEdit(false);
        setForm(ap);
    };

    return (
        <TableRow hover>

            {/* AUTOR */}
            <TableCell>
                {edit ? (
                    <TextField
                        name="autor_id"
                        value={form.autor_id?.nombre ?? form.autor_id?.email ?? form.autor_id}
                        onChange={handleChange}
                        size="small"
                    />
                ) : (ap.autor_id?.nombre ?? ap.autor_id?.email ?? ap.autor_id)}
            </TableCell>

            {/* TITULO */}
            <TableCell>
                {edit ? (
                    <TextField
                        name="titulo"
                        value={form.titulo}
                        onChange={handleChange}
                        size="small"
                    />
                ) : ap.titulo}
            </TableCell>

            {/* CONTENIDO */}
            <TableCell>
                {edit ? (
                    <TextField
                        name="contenido"
                        value={form.contenido}
                        onChange={handleChange}
                        size="small"
                        multiline
                    />
                ) : ap.contenido}
            </TableCell>

            {/* FECHA */}
            <TableCell>
                {edit ? (
                    <TextField
                        name="fecha_publicacion"
                        type="date"
                        value={form.fecha_publicacion?.substring(0, 10)}
                        onChange={handleChange}
                        size="small"
                    />
                ) : new Date(ap.fecha_publicacion).toLocaleDateString()}
            </TableCell>

            {/* LIKES */}
            <TableCell>
                {edit ? (
                    <TextField
                        name="likes"
                        type="number"
                        value={form.stats?.likes ?? 0}
                        onChange={handleChange}
                        size="small"
                    />
                ) : (ap.stats?.likes ?? 0)}
            </TableCell>

            {/* COMPARTIDO */}
            <TableCell>
                {edit ? (
                    <TextField
                        name="compartido"
                        type="number"
                        value={form.stats?.compartido ?? 0}
                        onChange={handleChange}
                        size="small"
                    />
                ) : (ap.stats?.compartido ?? 0)}
            </TableCell>

            {/* ACCIONES */}
            <TableCell>

                {edit ? (
                    <>
                        <Tooltip title="Guardar">
                            <IconButton onClick={handleSave} disabled={saving}>
                                <SaveIcon />
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="Cancelar">
                            <IconButton onClick={handleCancel}>
                                <CloseIcon />
                            </IconButton>
                        </Tooltip>
                    </>
                ) : (
                    <>
                        <Tooltip title="Editar">
                            <IconButton onClick={() => setEdit(true)}>
                                <EditIcon />
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="Eliminar">
                            <IconButton onClick={handleDelete}>
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip>
                    </>
                )}

            </TableCell>

        </TableRow>
    );
}