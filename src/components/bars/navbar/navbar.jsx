import { Box, Typography } from "@mui/material"
import { useLocation } from "react-router-dom"

const Navbar = () => {
    const location = useLocation()

    const pageTitles = {
        "/": { title: "Home", subtitle: "" },
        "/dashboard": { title: "Dashboard", subtitle: "" },
        "/categories": { title: "Categories", subtitle: "" },
        "/products": { title: "Products", subtitle: "" },
        "/orders": { title: "Orders", subtitle: "" },
        "/warehouse": { title: "Inventory", subtitle: "Omborni boshqaring va stokni kuzatib boring" },
        "/users": { title: "Users", subtitle: "" },
        "/files": { title: "Files", subtitle: "" },
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
