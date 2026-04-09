import * as React from 'react'
import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { loginRequest, registerRequest } from '../services/Publicacion.service'


import {
    Card,
    Typography,
    Box,
    Button,
    TextField,
    InputAdornment
} from '@mui/material'

// ICONOS
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import LoginIcon from '@mui/icons-material/Login';
import HowToRegIcon from '@mui/icons-material/HowToReg';

export const Myaccount = () => {

    const [view, setView] = useState("login");

    return (
        <Box
            sx={{
                width: "100%",
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                px: 2,
                mt: "120px",
                background: "#f4f6f8"
            }}
        >

            {/*  SWITCH LOGIN / REGISTER */}
            <Box sx={{
                display: "flex",
                gap: 2,
                mb: 3
            }}>
                <Button
                    onClick={() => setView("login")}
                    sx={{
                        ...tabStyle,
                        backgroundColor: view === "login" ? "#06d6f1" : "#e0e0e0"
                    }}
                    startIcon={<LoginIcon />}
                >
                    Iniciar sesión
                </Button>

                <Button
                    onClick={() => setView("register")}
                    sx={{
                        ...tabStyle,
                        backgroundColor: view === "register" ? "#0eaa23" : "#e0e0e0",
                        color: view === "register" ? "white" : "black"
                    }}
                    startIcon={<HowToRegIcon />}
                >
                    Registrarse
                </Button>
            </Box>

            {/*  CARD PRINCIPAL */}
            <Card sx={{
                width: { xs: "95%", sm: "70%", md: "420px" },
                p: 4,
                borderRadius: "20px",
                boxShadow: "0px 8px 25px rgba(0,0,0,0.15)"
            }}>

                {view === "login" ? <Login /> : <Register />}

            </Card>

        </Box>
    )
}

//////////////////////////////////////////////////////
// 🔹 LOGIN
//////////////////////////////////////////////////////

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { IconButton } from '@mui/material';

const Login = () => {
    const { login } = useAuth()

    const [form, setForm] = React.useState({
        email: 'admin@demo.com',
        password: '123456'
    })
    const [errors, setErrors] = React.useState({})
    const [showPassword, setShowPassword] = React.useState(false)
    const [loading, setLoading] = React.useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target
        let error = ''

        if (value.trim() === '') {
            error = 'Este campo es obligatorio'
        } else if (name === 'email' && !/\S+@\S+\.\S+/.test(value)) {
            error = 'Correo inválido'
        } else if (name === 'password' && value.length < 6) {
            error = 'Mínimo 6 caracteres'
        }

        setForm((prev) => ({ ...prev, [name]: value }))
        setErrors((prev) => ({ ...prev, [name]: error }))
    }

    const isValid =
        form.email.trim() !== '' &&
        form.password.trim() !== '' &&
        !errors.email &&
        !errors.password

    const onSubmit = async (e) => {
        e.preventDefault()

        const payload = {
            email: (form.email || '').toLowerCase().trim(),
            password: (form.password || '').trim()
        }

        if (!payload.email || !payload.password) {
            return alert('Ingresa email y contraseña')
        }

        try {
            setLoading(true)
            const res = await loginRequest(payload)
            const token = res?.data?.token || res?.data?.access_token || res?.data?.jwt
            if (!token) {
                return alert('No se recibió token de autenticación')
            }
            login(token)
            alert('Bienvenido')
            window.location.hash = '/posts'
        } catch (err) {
            console.error('LOGIN ERROR:', err?.response?.status, err?.response?.data)
            if (err?.response?.data?.message) {
                alert(err.response.data.message)
            } else {
                alert('No se pudo iniciar sesión')
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <Box component="form" onSubmit={onSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Typography variant="h5" fontWeight="bold" textAlign="center">
                Bienvenido 👋
            </Typography>

            <TextField
                name="email"
                label="Email"
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
                fullWidth
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <PersonIcon />
                        </InputAdornment>
                    )
                }}
                sx={inputStyle('#06d6f1')}
            />

            <TextField
                name="password"
                label="Contraseña"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                value={form.password}
                onChange={handleChange}
                error={!!errors.password}
                helperText={errors.password}
                fullWidth
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <LockIcon />
                        </InputAdornment>
                    ),
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    )
                }}
                sx={inputStyle('#06d6f1')}
            />

            <Button
                type="submit"
                variant="contained"
                disabled={!isValid || loading}
                sx={{
                    height: '50px',
                    borderRadius: '12px',
                    fontWeight: 'bold',
                    backgroundColor: isValid ? '#06d6f1' : '#ccc'
                }}
            >
                {loading ? 'Ingresando...' : 'Ingresar'}
            </Button>
        </Box>
    )
}

//////////////////////////////////////////////////////
// 🔹 REGISTER
//////////////////////////////////////////////////////

const Register = () => {

    const [form, setForm] = React.useState({
        usuario: "",
        correo: "",
        password: ""
    })

    const [errors, setErrors] = React.useState({})
    const [showPassword, setShowPassword] = React.useState(false)
    const [loading, setLoading] = React.useState(false) // ✅ NUEVO

    const handleChange = (e) => {
        const { name, value } = e.target

        let error = ""

        if (value === "") {
            error = "Campo obligatorio"
        } else if (name === "correo" && !/\S+@\S+\.\S+/.test(value)) {
            error = "Correo inválido"
        } else if (name === "password" && value.length < 6) {
            error = "Mínimo 6 caracteres"
        }

        setForm({
            ...form,
            [name]: value
        })

        setErrors({
            ...errors,
            [name]: error
        })
    }

    const isValid =
        form.usuario !== "" &&
        form.correo !== "" &&
        form.password.length >= 6 &&
        !errors.correo

    // ✅ NUEVO
    const onSubmit = async (e) => {
        e.preventDefault()

        try {
            setLoading(true)

            await registerRequest({
                nombre: form.usuario.trim(), // 👈 importante
                email: form.correo.toLowerCase().trim(),
                password: form.password.trim()
            })

            alert('Cuenta creada correctamente 🎉')

        } catch (err) {
            if (err?.response?.data?.message) {
                alert(err.response.data.message)
            } else {
                alert('Error al crear la cuenta')
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <Box
            component="form" // ✅ NUEVO
            onSubmit={onSubmit} // ✅ NUEVO
            sx={{ display: "flex", flexDirection: "column", gap: 3 }}
        >

            <Typography variant="h5" fontWeight="bold" textAlign="center">
                Crear cuenta
            </Typography>

            <TextField
                name="usuario"
                label="Usuario"
                value={form.usuario}
                onChange={handleChange}
                error={!!errors.usuario}
                helperText={errors.usuario}
                fullWidth
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <PersonIcon />
                        </InputAdornment>
                    )
                }}
                sx={inputStyle("#0eaa23")}
            />

            <TextField
                name="correo"
                label="Correo"
                type="email"
                autoComplete="email"
                value={form.correo}
                onChange={handleChange}
                error={!!errors.correo}
                helperText={errors.correo}
                fullWidth
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <EmailIcon />
                        </InputAdornment>
                    )
                }}
                sx={inputStyle("#0eaa23")}
            />

            <TextField
                name="password"
                label="Contraseña"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                value={form.password}
                onChange={handleChange}
                error={!!errors.password}
                helperText={errors.password}
                fullWidth
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <LockIcon />
                        </InputAdornment>
                    ),
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    )
                }}
                sx={inputStyle("#0eaa23")}
            />

            <Button
                type="submit" // ✅ IMPORTANTE
                variant="contained"
                disabled={!isValid || loading} // ✅ loading agregado
                sx={{
                    height: "50px",
                    borderRadius: "12px",
                    fontWeight: "bold",
                    backgroundColor: isValid ? "#0eaa23" : "#ccc"
                }}
            >
                {loading ? 'Creando cuenta...' : 'Crear cuenta'} {/* ✅ NUEVO */}
            </Button>

        </Box>
    )
}


//////////////////////////////////////////////////////
// 🎨 ESTILOS
//////////////////////////////////////////////////////

const tabStyle = {
    borderRadius: "10px",
    px: 3,
    py: 1,
    fontWeight: "bold",
    textTransform: "none",
    boxShadow: "0px 2px 6px rgba(0,0,0,0.2)"
}

const inputStyle = (color) => ({
    "& .MuiOutlinedInput-root": {
        borderRadius: "12px",
        "&.Mui-focused fieldset": {
            borderColor: color
        }
    }
})