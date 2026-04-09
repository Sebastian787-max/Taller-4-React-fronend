import React, { useState } from 'react'

//objetos de utilidad en el codigo
import { NavLink } from 'react-router-dom'
import {
    Box,
    Typography,
    Button,
    AppBar,
    Toolbar,
    Stack,
    IconButton,
    Drawer,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Divider
} from "@mui/material"

//logos de ultilidad en el codigo
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CottageIcon from '@mui/icons-material/Cottage';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import PaidIcon from '@mui/icons-material/Paid';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';


const navLinks = [
    { label: 'Inicio', to: '/', icon: <CottageIcon /> },
    { label: 'Beneficios', to: '/', icon: <DoneAllIcon /> },
    { label: 'Como funciona', to: '/', icon: <ContentPasteSearchIcon /> },
    { label: 'Precios', to: '/precios', icon: <PaidIcon /> },
    { label: 'Apis', to: '/Api', icon: <AutoGraphIcon /> },
    { label: 'Iniciar Sesión', to: '/Myaccount', icon: <AccountCircleIcon /> }
]

export const Header = () => {
    const [mobileOpen, setMobileOpen] = useState(false)

    const toggleDrawer = () => {
        setMobileOpen((prev) => !prev)
    }

    const closeDrawer = () => {
        setMobileOpen(false)
    }

    return (
        <>
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar
                    sx={{
                        backgroundColor: "#0eaa23",
                        boxShadow: "2px 4px 8px rgba(0,0,0,0.3)",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        py: { xs: 2, md: 3 },
                        minHeight: { xs: 64, md: 78 },
                        fontFamily: "'Poppins', sans-serif"
                    }}
                >
                    <Box
                        sx={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            maxWidth: "1200px",
                            mx: "auto",
                            px: { xs: 2, md: 3 }
                        }}
                    >
                        <Typography
                            component={NavLink}
                            to="/"
                            sx={{
                                color: "white",
                                display: "flex",
                                alignItems: "center",
                                textDecoration: "none",
                                fontSize: {
                                    xs: "0.95rem",
                                    md: "1.1rem"
                                },
                                fontWeight: 700,
                                lineHeight: 1
                            }}
                        >
                            <Box
                                component="img"
                                src="/img/WhatsApp_Image_2026-03-23_at_11.21.56_AM-removebg-preview.png"
                                alt="logo"
                                sx={{
                                    width: { xs: 36, md: 52 },
                                    height: { xs: 36, md: 52 },
                                    objectFit: "contain",
                                    mr: { xs: 0.8, md: 1.2 }
                                }}
                            />
                            MoneyFlow
                        </Typography>

                        <Stack
                            direction="row"
                            spacing={1}
                            sx={{ display: { xs: 'none', md: 'flex' }, flexWrap: 'wrap', justifyContent: 'flex-end', gap: 1 }}
                        >
                            {navLinks.map((item) => (
                                <Button
                                    key={item.label}
                                    component={NavLink}
                                    to={item.to}
                                    variant="contained"
                                    sx={buttonStyle}
                                >
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        {React.cloneElement(item.icon, { sx: iconStyle })}
                                        {item.label}
                                    </Box>
                                </Button>
                            ))}
                        </Stack>

                        <IconButton
                            onClick={toggleDrawer}
                            sx={{ display: { xs: 'flex', md: 'none' }, color: 'white' }}
                            aria-label="Abrir menú"
                        >
                            <MenuIcon fontSize="large" />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>

            <Drawer
                anchor="right"
                open={mobileOpen}
                onClose={closeDrawer}
                PaperProps={{
                    sx: {
                        top: { xs: '72px', sm: '72px' },
                        height: 'calc(100% - 72px)',
                        width: 280,
                        backgroundColor: '#0eaa23',
                        borderTopLeftRadius: '20px',
                        borderBottomLeftRadius: '20px'
                    }
                }}
            >
                <Box
                    sx={{
                        width: '100%',
                        height: '100%',
                        color: 'white',
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
                        <Typography variant="h6" sx={{ color: 'white' }}>
                            Menú
                        </Typography>
                        <IconButton onClick={closeDrawer} sx={{ color: 'white' }} aria-label="Cerrar menú">
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    <Divider sx={{ borderColor: 'rgba(255,255,255,0.3)' }} />
                    <List sx={{ flexGrow: 1, px: 1 }}>
                        {navLinks.map((item) => (
                            <ListItemButton
                                key={item.label}
                                component={NavLink}
                                to={item.to}
                                onClick={closeDrawer}
                                sx={{
                                    color: 'white',
                                    mb: 1,
                                    borderRadius: 2,
                                    '&.active': {
                                        backgroundColor: 'rgba(255,255,255,0.15)'
                                    }
                                }}
                            >
                                <ListItemIcon sx={{ color: 'white', minWidth: 36 }}>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText primary={item.label} />
                            </ListItemButton>
                        ))}
                    </List>
                </Box>
            </Drawer>
        </>
    )
}

const buttonStyle = {
    backgroundColor: "#06d6f1",
    boxShadow: "0px 2px 4px rgba(255, 255, 255, 0.33)",
    borderRadius: "6px",
    textTransform: "none",

    fontSize: {
        xs: "0.7rem",
        sm: "0.8rem",
        md: "0.9rem",
        lg: "1rem"
    },

    padding: {
        xs: "3px 8px",
        sm: "4px 10px",
        md: "6px 12px"
    },

    minHeight: {
        xs: "32px",
        sm: "36px",
        md: "40px"
    },

    display: "flex",
    alignItems: "center",
    gap: {
        xs: 0.5,
        sm: 1
    },

    "& .MuiSvgIcon-root": {
        fontSize: {
            xs: "16px",
            sm: "18px",
            md: "20px"
        }
    }
}

const iconStyle = {
    fontSize: { xs: 18, sm: 20, md: 22, lg: 24 },
    marginRight: {
        xs: "2px",
        sm: "4px",
        md: "6px"
    }
}