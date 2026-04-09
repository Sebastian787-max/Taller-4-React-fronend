import * as React from "react"
import { useState } from "react"
import {
    Box,
    Typography,
    Card,
    CardContent,
    Grid,
    Button,
    TextField,
    InputAdornment,
    MenuItem,
    Paper,
    Divider
} from "@mui/material"

import PeopleIcon from "@mui/icons-material/People"
import PaidIcon from "@mui/icons-material/Paid"
import TrendingUpIcon from "@mui/icons-material/TrendingUp"
import LogoutIcon from "@mui/icons-material/Logout"
import PersonAddIcon from "@mui/icons-material/PersonAdd"

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer
} from "recharts"

export const AdminDashboard = () => {

    // ── Estado PanelDerecho ──────────────────────────────
    const [gastos, setGastos] = useState([])
    const [form, setForm] = useState({
        fecha: "",
        categoria: "",
        valor: "",
        descripcion: "",
        responsable: ""
    })

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const guardarGasto = () => {
        if (!form.valor) return
        setGastos([...gastos, form])
        setForm({ fecha: "", categoria: "", valor: "", descripcion: "", responsable: "" })
    }

    const dataChart = Object.values(
        gastos.reduce((acc, gasto) => {
            const cat = gasto.categoria
            if (!acc[cat]) acc[cat] = { categoria: cat, total: 0 }
            acc[cat].total += Number(gasto.valor)
            return acc
        }, {})
    )

    const total = gastos.reduce((sum, g) => sum + Number(g.valor), 0)
    // ────────────────────────────────────────────────────

    return (
        <Box sx={{ mt: "120px", p: 4, backgroundColor: "#f4f6f8", minHeight: "100vh" }}>

            {/* HEADER */}
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
                <Typography variant="h4" fontWeight="bold">
                    Panel de Administración
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<LogoutIcon />}
                    sx={{ backgroundColor: "#0eaa23", "&:hover": { backgroundColor: "#0c8f1e" } }}
                >
                    Cerrar sesión
                </Button>
            </Box>

            {/* ESTADÍSTICAS */}
            <Grid container spacing={3} mb={4}>
                {stats.map((item, i) => (
                    <Grid size={{ xs: 12, sm: 6, md: 4 }} key={i}>
                        <Card sx={cardStatStyle}>
                            <CardContent>
                                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                                    <Box sx={{ backgroundColor: item.color, color: "white", p: 1.5, borderRadius: "12px" }}>
                                        {item.icon}
                                    </Box>
                                    <Box>
                                        <Typography variant="h6" fontWeight="bold">{item.value}</Typography>
                                        <Typography variant="body2">{item.label}</Typography>
                                    </Box>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* FORMULARIO + TABLA USUARIOS */}
            <Grid container spacing={3} mb={4}>

                {/* CREAR USUARIO */}
                <Grid size={{ xs: 12, md: 5 }}>
                    <Card sx={cardStyle}>
                        <CardContent>
                            <Typography variant="h6" mb={2} fontWeight="bold">Crear usuario</Typography>
                            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                                <TextField
                                    label="Nombre"
                                    fullWidth
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <PersonAddIcon />
                                            </InputAdornment>
                                        )
                                    }}
                                />
                                <TextField label="Correo" fullWidth />
                                <TextField label="Contraseña" type="password" fullWidth />
                                <Button
                                    variant="contained"
                                    sx={{ mt: 1, backgroundColor: "#06d6f1", "&:hover": { backgroundColor: "#05bcd4" } }}
                                >
                                    Crear cuenta
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                {/* USUARIOS RECIENTES */}
                <Grid size={{ xs: 12, md: 7 }}>
                    <Card sx={cardStyle}>
                        <CardContent>
                            <Typography variant="h6" mb={2} fontWeight="bold">Usuarios recientes</Typography>
                            {users.map((user, i) => (
                                <Box key={i} sx={userRowStyle}>
                                    <Box>
                                        <Typography fontWeight="bold">{user.name}</Typography>
                                        <Typography variant="body2" color="text.secondary">{user.email}</Typography>
                                    </Box>
                                    <Typography sx={{ color: "#0eaa23", fontWeight: "bold" }}>Activo</Typography>
                                </Box>
                            ))}
                        </CardContent>
                    </Card>
                </Grid>

            </Grid>

            {/* ── SECCIÓN DE GASTOS ─────────────────────────────── */}
            <Divider sx={{ my: 4 }} />

            <Typography variant="h5" fontWeight="bold" mb={3}>
                Gestión de Gastos
            </Typography>

            <Grid container spacing={3}>

                {/* 📊 GRÁFICA ARRIBA - ANCHO COMPLETO */}
                <Grid size={{ xs: 12 }}>
                    <Card sx={cardStyle}>
                        <CardContent>
                            <Typography variant="h6" fontWeight="bold" mb={2}>
                                Estadísticas por categoría
                            </Typography>

                            <ResponsiveContainer width="100%" height={400}>
                                <BarChart data={dataChart}>
                                    <XAxis dataKey="categoria" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="total" fill="#0eaa23" radius={[6, 6, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </Grid>

                {/* 📋 GASTOS DEL PERIODO - ABAJO A LA IZQUIERDA */}
                <Grid size={{ xs: 12, md: 6 }}>
                    <Card sx={cardStyle}>
                        <CardContent>
                            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                                <Typography variant="h6" fontWeight="bold">
                                    Gastos del período
                                </Typography>

                                <Typography sx={{ color: "#0eaa23", fontWeight: "bold" }}>
                                    Total: ${total.toLocaleString()}
                                </Typography>
                            </Box>

                            {gastos.length === 0 ? (
                                <Typography>No hay registros aún</Typography>
                            ) : (
                                gastos.map((g, i) => (
                                    <Box key={i} sx={userRowStyle}>
                                        <Box>
                                            <Typography fontWeight="bold">
                                                {g.categoria} — {g.fecha}
                                            </Typography>
                                            <Typography variant="body2">
                                                {g.descripcion}
                                            </Typography>
                                        </Box>
                                        <Typography sx={{ color: "#06d6f1" }}>
                                            ${Number(g.valor).toLocaleString()}
                                        </Typography>
                                    </Box>
                                ))
                            )}
                        </CardContent>
                    </Card>
                </Grid>

                {/* 🧾 REGISTRAR GASTO - ABAJO A LA DERECHA */}
                <Grid size={{ xs: 12, md: 6 }}>
                    <Card sx={cardStyle}>
                        <CardContent>
                            <Typography variant="h6" fontWeight="bold" mb={2}>
                                Registrar gasto
                            </Typography>

                            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                                <TextField
                                    label="Fecha"
                                    type="date"
                                    name="fecha"
                                    value={form.fecha}
                                    onChange={handleChange}
                                    InputLabelProps={{ shrink: true }}
                                />

                                <TextField
                                    select
                                    label="Categoría"
                                    name="categoria"
                                    value={form.categoria}
                                    onChange={handleChange}
                                >
                                    <MenuItem value="Comida">Comida</MenuItem>
                                    <MenuItem value="Transporte">Transporte</MenuItem>
                                    <MenuItem value="Servicios">Servicios</MenuItem>
                                </TextField>

                                <TextField
                                    label="Valor"
                                    name="valor"
                                    value={form.valor}
                                    onChange={handleChange}
                                />

                                <TextField
                                    label="Descripción"
                                    name="descripcion"
                                    value={form.descripcion}
                                    onChange={handleChange}
                                />

                                <TextField
                                    label="Responsable"
                                    name="responsable"
                                    value={form.responsable}
                                    onChange={handleChange}
                                />

                                <Button
                                    variant="contained"
                                    onClick={guardarGasto}
                                    sx={{
                                        backgroundColor: "#06d6f1",
                                        "&:hover": { backgroundColor: "#05bcd4" }
                                    }}
                                >
                                    Guardar
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

            </Grid>

        </Box>
    )
}
//////////////////////////////////////////////////////
// DATA SIMULADA
//////////////////////////////////////////////////////

const stats = [
    { label: "Usuarios", value: "1,240", icon: <PeopleIcon />, color: "#0eaa23" },
    { label: "Ingresos", value: "$8,400", icon: <PaidIcon />, color: "#06d6f1" },
    { label: "Crecimiento", value: "+12%", icon: <TrendingUpIcon />, color: "#0eaa23" }
]

const users = [
    { name: "Juan Pérez", email: "juan@email.com" },
    { name: "Ana Torres", email: "ana@email.com" },
    { name: "Carlos Ruiz", email: "carlos@email.com" }
]

//////////////////////////////////////////////////////
// ESTILOS
//////////////////////////////////////////////////////

const cardStyle = {
    borderRadius: "16px",
    boxShadow: "0px 6px 20px rgba(0,0,0,0.1)"
}

const cardStatStyle = {
    borderRadius: "16px",
    boxShadow: "0px 6px 20px rgba(0,0,0,0.1)",
    transition: "0.3s",
    "&:hover": { transform: "translateY(-5px)" }
}

const userRowStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 0",
    borderBottom: "1px solid #eee"
}