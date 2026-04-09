import * as React from 'react'
import {
    Card, CardContent, Typography, Box, Button,
} from "@mui/material"
import {
    AutoGraph,
    Savings,
    Insights,
    Psychology,
    Security,
    TrendingUp,
    CheckCircle
} from "@mui/icons-material";

export const Content = () => {
    return (
        <Box
            sx={{
                width: "100%",
                minHeight: "100vh",
                margin: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                backgroundColor: "#f5f7fa",
                overflowX: "hidden",
                pt: { xs: 9, md: 11 }
            }}
        >
            {/* 🔹 HERO */}
            <Box
                sx={{
                    width: "100%",
                    minHeight: { xs: "70vh", md: "80vh" },
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    px: { xs: 2, md: 6 },
                    mt: { xs: 12, md: 16 },
                    background: "linear-gradient(135deg, #f5f7fa 0%, #e4ecf7 100%)"
                }}
            >
                <Box
                    sx={{
                        width: "100%",
                        maxWidth: "1100px",
                        margin: "0 auto",
                        display: "flex",
                        flexDirection: { xs: "column", md: "row" },
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 4
                    }}
                >
                    {/* TEXTO */}
                    <Box sx={{ flex: 1 }}>
                        <Typography
                            sx={{
                                fontSize: { xs: "2rem", md: "2.8rem", lg: "3.2rem" },
                                fontWeight: "bold",
                                color: "#1a1a1a",
                                mb: 2,
                                lineHeight: 1.2
                            }}
                        >
                            Gestiona con
                            <br />
                            <Box component="span" sx={{ color: "#0eaa23" }}>
                                MoneyFlow
                            </Box>
                        </Typography>

                        <Typography
                            sx={{
                                fontSize: { xs: "1rem", md: "1.1rem" },
                                color: "#555",
                                mb: 3,
                                maxWidth: "450px"
                            }}
                        >
                            Administra, controla y optimiza tus finanzas de forma inteligente con nuestra API MoneyFlow.
                        </Typography>

                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: "#06d6f1",
                                px: 3,
                                py: 1.2,
                                borderRadius: "30px",
                                textTransform: "none",
                                fontSize: "14px",
                                "&:hover": {
                                    backgroundColor: "#e85a47"
                                }
                            }}
                        >
                            Explorar productos →
                        </Button>
                    </Box>

                    {/* IMAGEN */}
                    <Box sx={{ flex: 1, display: "flex", justifyContent: "center" }}>
                        <Box
                            component="img"
                            src="/img/ddd493c7-e2f0-454d-aa95-d47798a145e0.png"
                            alt="Planeta"
                            sx={{
                                width: { xs: "280px", md: "450px", lg: "600px" },
                                maxWidth: "100%"
                            }}
                        />
                    </Box>

                </Box>
            </Box>

            {/*  BENEFICIOS */}
            <Box sx={{ p: { xs: 3, md: 4 }, width: "100%", maxWidth: "1100px" }}>
                <Typography variant="h5" sx={{ mb: 3, fontWeight: 700 }}>
                    ¿Por qué usar nuestra API?
                </Typography>

                <Box sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(220px,1fr))",
                    gap: 2
                }}>
                    {[
                        { text: "Automatiza el control de gastos", icon: <AutoGraph /> },
                        { text: "Evita pérdidas innecesarias", icon: <Savings /> },
                        { text: "Visualiza datos en tiempo real", icon: <Insights /> },
                        { text: "Mejora decisiones financieras", icon: <Psychology /> },
                        { text: "Reduce errores humanos", icon: <Security /> },
                        { text: "Optimiza tu negocio", icon: <TrendingUp /> }
                    ].map((item, i) => (
                        <Card key={i} sx={{ p: 2, display: "flex", gap: 2 }}>
                            <Box sx={{ color: "#ff6b57" }}>{item.icon}</Box>
                            <Typography sx={{ fontWeight: 600 }}>
                                {item.text}
                            </Typography>
                        </Card>
                    ))}
                </Box>
            </Box>
            {/*  COMO FUNCIONA */}
            <Box sx={{ p: { xs: 3, md: 4 }, width: "100%", maxWidth: "1100px" }}>
                <Typography variant="h5" sx={{ mb: 3, fontWeight: 700 }}>
                    ¿Cómo funciona?
                </Typography>

                <Box sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                    gap: 3
                }}>
                    <Box>
                        <Typography>1️⃣ Registras tus gastos</Typography>
                        <Typography>2️⃣ La API procesa la info</Typography>
                        <Typography>3️⃣ Obtienes reportes</Typography>
                        <Typography>4️⃣ Tomas decisiones</Typography>
                    </Box>
                    <Box
                        component="img"
                        src="/img/person-using-a-laptop-to-study-on-work-desk-free-photo.jpg"
                        sx={{ width: "100%", borderRadius: 2 }}
                    />
                </Box>
            </Box>
            {/*  PLANES */}
            <Box sx={{
                p: 5,
                width: "100%",
                backgroundColor: "#eef2f7"
            }}>
                <Box sx={{ maxWidth: "1200px", mx: "auto" }}>

                    <Typography variant="h4" sx={{ mb: 1, fontWeight: 700 }}>
                        Planes disponibles
                    </Typography>

                    <Typography sx={{ mb: 4, color: "#555" }}>
                        Elige el plan que mejor se adapte a tu negocio y comienza a gestionar tus finanzas de forma inteligente.
                    </Typography>

                    <Box sx={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(280px,1fr))",
                        gap: 3
                    }}>
                        {[
                            {
                                title: "Básico",
                                price: "$0",
                                desc: "Ideal para comenzar",
                                features: [
                                    "Control simple de gastos",
                                    "Reportes básicos",
                                    "1 usuario",
                                    "Acceso limitado a API"
                                ]
                            },
                            {
                                title: "Experto",
                                price: "$10/mes",
                                desc: "Más popular ",
                                highlight: true,
                                features: [
                                    "Todo lo básico",
                                    "Alertas inteligentes",
                                    "Multiusuario",
                                    "Integración completa API",
                                    "Soporte prioritario"
                                ]
                            },
                            {
                                title: "Deluxe",
                                price: "$25/mes",
                                desc: "Para negocios avanzados",
                                features: [
                                    "Todo incluido",
                                    "IA financiera",
                                    "Análisis predictivo",
                                    "Soporte premium 24/7",
                                    "Escalabilidad total"
                                ]
                            }
                        ].map((plan, i) => (
                            <Card
                                key={i}
                                sx={{
                                    p: 4,
                                    borderRadius: 4,
                                    color: "white",
                                    background: plan.highlight
                                        ? "linear-gradient(135deg, #1565c0, #42a5f5)"
                                        : "linear-gradient(135deg, #1e3c72, #2a5298)",
                                    boxShadow: 6,
                                    transform: plan.highlight ? "scale(1.05)" : "scale(1)",
                                    border: plan.highlight ? "2px solid #4fc3f7" : "none",
                                    transition: "0.3s",
                                    "&:hover": {
                                        transform: "translateY(-8px) scale(1.05)"
                                    }
                                }}
                            >

                                {/* 🔥 TÍTULO */}
                                <Typography variant="h5" sx={{ fontWeight: 700 }}>
                                    {plan.title}
                                </Typography>

                                {/* 📌 DESCRIPCIÓN */}
                                <Typography sx={{ opacity: 0.9, mb: 2 }}>
                                    {plan.desc}
                                </Typography>

                                {/* 💰 PRECIO */}
                                <Typography sx={{ fontSize: "2.5rem", my: 2, fontWeight: 700 }}>
                                    {plan.price}
                                </Typography>

                                {/* ✅ FEATURES */}
                                <Box sx={{ mb: 3 }}>
                                    {plan.features.map((f, idx) => (
                                        <Box key={idx} sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                                            <CheckCircle sx={{ fontSize: 20, mr: 1, color: "#a5d6a7" }} />
                                            <Typography>{f}</Typography>
                                        </Box>
                                    ))}
                                </Box>

                                {/* 🟢 BOTÓN */}
                                <Button
                                    fullWidth
                                    variant="contained"
                                    sx={{
                                        mt: 2,
                                        backgroundColor: "#2ecc71",
                                        color: "#fff",
                                        fontWeight: 600,
                                        borderRadius: "25px",
                                        "&:hover": {
                                            backgroundColor: "#27ae60"
                                        }
                                    }}
                                >
                                    Elegir plan
                                </Button>

                            </Card>
                        ))}
                    </Box>
                </Box>
            </Box>

            {/*  API */}
            <Box sx={{
                p: 5,
                width: "100%",
                maxWidth: "1200px",
                mx: "auto"
            }}>
                <Typography variant="h4" sx={{ mb: 4, fontWeight: 700 }}>
                    ¿Cómo usar la API?
                </Typography>

                {/* 🔹 PASOS */}
                <Box sx={{ mb: 4 }}>
                    <Typography sx={{ mb: 2 }}>
                        Sigue estos pasos para comenzar a utilizar nuestra API MoneyFlow:
                    </Typography>

                    <Typography sx={{ mb: 1 }}>🔐 1. Regístrate en la plataforma y crea tu cuenta.</Typography>
                    <Typography sx={{ mb: 1 }}>🔑 2. Obtén tu API Key desde el panel de usuario.</Typography>
                    <Typography sx={{ mb: 1 }}>🔗 3. Integra la API en tu sistema mediante peticiones HTTP.</Typography>
                    <Typography sx={{ mb: 1 }}>📊 4. Empieza a gestionar tus gastos, ingresos y reportes en tiempo real.</Typography>
                </Box>

                {/* 🔹 EJEMPLO */}
                <Typography sx={{ mb: 2, fontWeight: 600 }}>
                    Ejemplo de registro de gasto:
                </Typography>

                <Box sx={{
                    backgroundColor: "#111",
                    color: "#0f0",
                    p: 3,
                    borderRadius: 2,
                    fontFamily: "monospace",
                    fontSize: "14px",
                    overflowX: "auto"
                }}>
                    {`POST /api/gastos
Headers:
  Authorization: Bearer TU_API_KEY

Body:
{
  "valor": 50000,
  "categoria": "comida",
  "descripcion": "Almuerzo"
}`}
                </Box>
            </Box>

            {/* 🔹 TARJETAS INFERIORES */}
            <Box sx={{
                width: "100%",
                maxWidth: "1200px",
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: 3,
                pb: 5
            }}>
                {[1, 2, 3].map((item) => (
                    <Card key={item} sx={CardStyle}>
                        <CardContent sx={{ p: 0 }}>
                            <Box sx={{
                                width: "100%",
                                height: "200px"
                            }}>
                                <img
                                    src={`/img/money${item}.jpg`}
                                    alt="Foto"
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                    }}
                                />
                            </Box>

                            <Box sx={cardContentStyle2}>
                                <Typography sx={titleStyle}>
                                    {item === 1 && "Análisis de gastos"}
                                    {item === 2 && "Gestión de gastos"}
                                    {item === 3 && "Plan económico"}
                                </Typography>

                                <Typography sx={textStyle}>
                                    {item === 1 && "Visualiza en qué gastas tu dinero y toma mejores decisiones."}
                                    {item === 2 && "Organiza y controla todos tus gastos fácilmente."}
                                    {item === 3 && "Planifica tus finanzas y alcanza tus metas."}
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                ))}
            </Box>

        </Box>
    )
}
const CardStyle = {
    width: { xs: "100%", sm: "48%", md: "30%" },
    borderRadius: "20px",
    boxShadow: "2px 4px 8px rgba(0, 0, 0, 0.2)",
}

const cardContentStyle2 = {
    padding: 2,
    textAlign: "center"
}

const titleStyle = {
    fontSize: "18px",
    fontWeight: 700,
    mb: 1,
}

const textStyle = {
    fontSize: "14px",
    color: "#555",
}