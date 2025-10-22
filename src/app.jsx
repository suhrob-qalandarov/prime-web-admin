import { useEffect, useState } from "react"
import { Route, Routes, useLocation } from "react-router-dom"
import { Home, Sidebar, Navbar, Dashboard, Category, Product, Order, User, Warehouse } from "./components"
import ToggleButton from "./components/bars/sidebar/toggle-button"
import { Box } from "@mui/material"
import Loading from './components/loading/loading';
import NotFound from './components/error/not-found'
import UserService from "./service/user"
import AuthService from "./service/auth"

const App = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [user, setUser] = useState(null)
    const [isAdminVerified, setIsAdminVerified] = useState(false)
    const [loading, setLoading] = useState(true)
    const location = useLocation()

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                setLoading(true)
                // Check if user has admin role, get user data
                const isAdmin = await AuthService.checkAdminWithCredentials()
                if (isAdmin) {
                    setIsAdminVerified(true)
                    const userData = await UserService.getOrLoadData()
                    setUser(userData)
                } else {
                    setIsAdminVerified(false)
                    window.location.href = '/'
                }

            } catch (error) {
                console.error('Error fetching user data:', error)
                setIsAdminVerified(false)
                window.location.href = '/'
            } finally {
                setLoading(false)
            }
        }
        fetchUserData()
    }, [])

    if (loading) {
        return <Loading message="Verifying access..." />;
    }

    // Only allow rendering of routes if admin is verified
    if (!isAdminVerified && location.pathname !== '/') {
        return null
    }

    return (
        <Box sx={{ display: "flex", position: "relative", minHeight: "100vh" }}>
            {/* Sidebar */}
            <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} user={user} />

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
                        {isAdminVerified && (
                            <>
                                <Route path="/dashboard" element={<Dashboard />} />
                                <Route path="/categories" element={<Category />} />
                                <Route path="/products" element={<Product />} />
                                <Route path="/orders" element={<Order />} />
                                <Route path="/warehouse" element={<Warehouse />} />
                                <Route path="/users" element={<User />} />
                                <Route path="/files" element={<Home />} />
                            </>
                        )}
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </Box>
            </Box>
        </Box>
    )
}

export default App