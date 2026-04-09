import PublicacionItem from './PublicacionItem';

import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    Box
} from '@mui/material';

export default function PublicacionList({ items, onChange }) {

    if (!items?.length) {
        return (
            <Box
                sx={{
                    p: 4,
                    textAlign: 'center',
                    borderRadius: 3,
                    boxShadow: 2
                }}
            >
                <Typography variant="h6">
                    No hay publicaciones 😢
                </Typography>
            </Box>
        );
    }

    return (
        <TableContainer
            component={Paper}
            sx={{
                borderRadius: 3,
                boxShadow: 3,
                overflowX: 'auto'
            }}
        >
            <Table>

                <TableHead>
                    <TableRow
                        sx={{
                            backgroundColor: '#0eaa23'
                        }}
                    >
                        <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Autor</TableCell>
                        <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Título</TableCell>
                        <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Contenido</TableCell>
                        <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Fecha</TableCell>
                        <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Likes</TableCell>
                        <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Compartido</TableCell>
                        <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Acciones</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {items.map((ap) => (
                        <PublicacionItem
                            key={ap._id}
                            ap={ap}
                            onChange={onChange}
                        />
                    ))}
                </TableBody>

            </Table>
        </TableContainer>
    );
}