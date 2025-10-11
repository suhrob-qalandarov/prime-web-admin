"use client"

import { useState } from "react"
import { Route, Routes, useLocation } from "react-router-dom"
import { Home, Sidebar, Navbar, Footer, Dashboard, Category, Product, Order, User } from "./components"
import ToggleButton from "./components/bars/sidebar/toggle-button"
import { Box } from "@mui/material"

const App = () => {
    const [isOpen, setIsOpen] = useState(false)
    const location = useLocation()
    const hideFooterPages = ["/login"]

    return (
        <Box sx={{ display: "flex", position: "relative", minHeight: "100vh" }}>
            {/* Sidebar */}
            <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

            {/* Toggle Button */}
            <ToggleButton isOpen={isOpen} setIsOpen={setIsOpen} />

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
