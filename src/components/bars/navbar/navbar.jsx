import { Box, Typography } from "@mui/material"

const Navbar = () => {
    return (
        <Box
            sx={{
                height: "var(--header-height)",
                background: "white",
                borderBottom: "1px solid var(--gray-200)",
                display: "flex",
                alignItems: "center",
                padding: "0 2rem",
                boxShadow: "var(--box-shadow)",
            }}
        >
            <Typography variant="h5" sx={{ fontWeight: 600, color: "var(--dark-color)" }}>
                Dashboard
            </Typography>
        </Box>
    )
}

export default Navbar
