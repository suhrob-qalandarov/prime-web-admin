import { Box, Typography } from "@mui/material"
import { useLocation } from "react-router-dom"

const Navbar = () => {
    const location = useLocation()

    const pageTitles = {
        "/": { title: "Home", subtitle: "" },
        "/dashboard": { title: "DASHBOARD", subtitle: "Umumiy statistika va nazorat" },
        "/categories": { title: "KATEGORIYALAR PANELI", subtitle: "Kategoriyalarni boshqarish va kuzatish" },
        "/products": { title: "MAHSULOTLAR PANELI", subtitle: "Mahsulotlarni boshqarish va kuzatish" },
        "/orders": { title: "BUYURTMALAR PANELI", subtitle: "Onlayn berilgan buyurtmalarni boshqarish va kuzatish" },
        "/warehouse": { title: "OMBORXONA PANELI", subtitle: "Omborni boshqarish va stokni kuzatish" },
        "/users": { title: "FOYDALANUVCHILAR PANELI", subtitle: "Foydalanuvchilarni boshqarish va kuzatish" },
        "/files": { title: "RASM FAYLLAR PANELI", subtitle: "Fayllarni boshqarish va kuzatish" },
    }

    const currentPage = pageTitles[location.pathname] || { title: "Page", subtitle: "" }

    return (
        <Box
            sx={{
                height: "var(--header-height)",
                background: "white",
                borderBottom: "1px solid var(--gray-200)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                padding: "0 2rem",
                boxShadow: "var(--box-shadow)",
                position: "sticky",
                top: 0,
                zIndex: 1000,
            }}
        >
            <Typography variant="h5" sx={{ fontWeight: 600, color: "var(--dark-color)" }}>
                {currentPage.title}
            </Typography>
            {currentPage.subtitle && (
                <Typography variant="body2" sx={{ color: "var(--gray-600)", marginTop: "0.25rem" }}>
                    {currentPage.subtitle}
                </Typography>
            )}
        </Box>
    )
}

export default Navbar
