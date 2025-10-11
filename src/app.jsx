"use client"

import { useState } from "react"
import { Route, Routes, useLocation } from "react-router-dom"
import { Home, Sidebar, Navbar, Footer, Dashboard, Category, Product, Order, User } from "./components"
import { Button, Box } from "@mui/material"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons"

const App = () => {
    const [isOpen, setIsOpen] = useState(false)
    const location = useLocation()
    const hideFooterPages = ["/login"]

    return (
        <Box sx={{ display: "flex", position: "relative", minHeight: "100vh" }}>
            {/* Sidebar */}
            <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

            <Button
                onClick={() => setIsOpen(!isOpen)}
                sx={{
                    position: "fixed",
                    top: "50%",
                    left: isOpen ? "calc(var(--sidebar-width) - 20px)" : "40px",
                    transform: "translateY(-50%)",
                    minWidth: "40px",
                    width: "40px",
                    height: "40px",
                    background: "linear-gradient(135deg, var(--primary-color), var(--secondary-color))",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)",
                    zIndex: 1200,
                    cursor: "pointer",
                    border: "2px solid rgba(255, 255, 255, 0.2)",
                    "&:hover": {
                        background: "linear-gradient(135deg, var(--secondary-color), var(--primary-color))",
                        transform: "translateY(-50%) scale(1.15)",
                        boxShadow: "0 6px 20px rgba(102, 126, 234, 0.6)",
                    },
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
            >
                <FontAwesomeIcon icon={isOpen ? faChevronLeft : faChevronRight} style={{ fontSize: "18px", color: "white" }} />
            </Button>

            {/* Main Content */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    transition: "margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    minHeight: "100vh",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <Navbar />
                <Box sx={{ flex: 1 }}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/categories" element={<Category />} />
                        <Route path="/products" element={<Product />} />
                        <Route path="/orders" element={<Order />} />
                        <Route path="/users" element={<User />} />
                        <Route path="/files" element={<Home />} />
                        <Route path="*" element={<h1>404 Not Found</h1>} />
                    </Routes>
                </Box>
                {!hideFooterPages.includes(location.pathname) && <Footer />}
            </Box>
        </Box>
    )
}

export default App
