"use client"
import {
    Drawer,
    Box,
    Typography,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Button,
    Avatar,
} from "@mui/material"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSignOutAlt, faUser } from "@fortawesome/free-solid-svg-icons"
import { links } from "../../../constants/page-links"

const MINI_WIDTH = "60px"
const FULL_WIDTH = "var(--sidebar-width)"

const Sidebar = ({ isOpen, setIsOpen }) => {
    const currentPath = window.location.pathname

    const handleMenuClick = (e) => {
        // Allow navigation to happen
        setTimeout(() => {
            setIsOpen(false)
        }, 100)
    }

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: isOpen ? FULL_WIDTH : MINI_WIDTH,
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                    width: isOpen ? FULL_WIDTH : MINI_WIDTH,
                    height: "100vh",
                    background: "linear-gradient(135deg, var(--gray-900) 0%, var(--gray-800) 100%)",
                    color: "white",
                    zIndex: 1000,
                    transition: "width 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    display: "flex",
                    flexDirection: "column",
                    boxShadow: "var(--box-shadow-lg)",
                    overflowX: "hidden",
                },
            }}
        >
            {/* Sidebar Header */}
            <Box
                sx={{
                    padding: isOpen ? "2rem" : "0.60rem",
                    textAlign: "center",
                    borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                    background: "rgba(255, 255, 255, 0.05)",
                    backdropFilter: "blur(10px)",
                    whiteSpace: "nowrap",
                    transition: "padding 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
            >
                <Box
                    sx={{
                        width: isOpen ? "60px" : "40px",
                        height: isOpen ? "60px" : "40px",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "0 auto 1rem",
                        boxShadow: "0 8px 25px rgba(102, 126, 234, 0.3)",
                        position: "relative",
                        overflow: "hidden",
                        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                        background: "linear-gradient(135deg, var(--primary-color), var(--secondary-color))",
                    }}
                >
                    <img
                        src="/logo.jpeg"
                        alt="Logo"
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            borderRadius: "50%",
                        }}
                    />
                </Box>
                <Box>
                    <Typography
                        variant="h4"
                        sx={{
                            fontSize: isOpen ? "1.5rem" : "1.2rem",
                            fontWeight: 700,
                            marginBottom: isOpen ? "0.25rem" : 0,
                            background: "linear-gradient(135deg, var(--primary-color), var(--secondary-color))",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                        }}
                    >
                        {isOpen ? "PRIME77" : "P77"}
                    </Typography>
                </Box>
            </Box>

            {/* Sidebar Navigation */}
            <List sx={{ flex: 1, padding: "1rem 0" }}>
                {links.map((item) => {
                    const isActive = currentPath === item.href
                    return (
                        <ListItem
                            key={item.text}
                            disablePadding
                            sx={{
                                "& .MuiListItemButton-root": {
                                    padding: isOpen ? "1rem 2rem" : "1rem",
                                    color: "rgba(255, 255, 255, 0.8)",
                                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                                    position: "relative",
                                    fontSize: "0.95rem",
                                    fontWeight: 500,
                                    background: isActive
                                        ? "linear-gradient(135deg, var(--primary-color), var(--secondary-color))"
                                        : "none",
                                    "&:hover": isActive
                                        ? {}
                                        : {
                                            background: "rgba(255, 255, 255, 0.1)",
                                            color: "white",
                                        },
                                    justifyContent: isOpen ? "flex-start" : "center",
                                },
                            }}
                        >
                            <ListItemButton component="a" href={item.href} onClick={handleMenuClick}>
                                <ListItemIcon
                                    sx={{
                                        width: "20px",
                                        marginRight: isOpen ? "1rem" : 0,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        color: "inherit",
                                        minWidth: "unset",
                                        transition: "margin 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                                    }}
                                >
                                    <FontAwesomeIcon icon={item.icon} style={{ fontSize: "20px" }} />
                                </ListItemIcon>
                                <ListItemText
                                    primary={item.text}
                                    sx={{
                                        opacity: isOpen ? 1 : 0,
                                        transition: "opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                                        visibility: isOpen ? "visible" : "hidden",
                                    }}
                                />
                                <Box
                                    sx={{
                                        position: "absolute",
                                        right: 0,
                                        top: "50%",
                                        transform: isActive ? "translateY(-50%) scaleY(1)" : "translateY(-50%) scaleY(0)",
                                        width: "4px",
                                        height: "30px",
                                        background: "linear-gradient(135deg, var(--primary-color), var(--secondary-color))",
                                        borderRadius: "2px 0 0 2px",
                                        opacity: isActive ? 1 : 0,
                                        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                                    }}
                                />
                            </ListItemButton>
                        </ListItem>
                    )
                })}
            </List>

            {/* Sidebar Footer */}
            <Box
                sx={{
                    padding: isOpen ? "1.5rem" : "1rem",
                    borderTop: "1px solid rgba(255, 255, 255, 0.1)",
                    whiteSpace: "nowrap",
                    transition: "padding 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "1rem",
                        padding: isOpen ? "1rem" : "0.5rem",
                        background: isOpen ? "rgba(255, 255, 255, 0.05)" : "none",
                        borderRadius: "var(--border-radius-sm)",
                        backdropFilter: isOpen ? "blur(10px)" : "none",
                        justifyContent: isOpen ? "flex-start" : "center",
                        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    }}
                >
                    <Avatar
                        sx={{
                            width: isOpen ? "40px" : "32px",
                            height: isOpen ? "40px" : "32px",
                            background: "linear-gradient(135deg, var(--primary-color), var(--secondary-color))",
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            marginRight: isOpen ? "0.75rem" : 0,
                            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                        }}
                    >
                        <FontAwesomeIcon
                            icon={faUser}
                            style={{
                                fontSize: isOpen ? "18px" : "14px",
                                transition: "font-size 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                            }}
                        />
                    </Avatar>
                    {isOpen && (
                        <Box sx={{ flex: 1 }}>
                            <Typography sx={{ fontWeight: 600, fontSize: "0.9rem" }}>Admin</Typography>
                            <Typography sx={{ fontSize: "0.75rem", color: "var(--gray-400)" }}>Super Admin</Typography>
                        </Box>
                    )}
                </Box>
                {isOpen ? (
                    // Open state: Full button with text
                    <Button
                        sx={{
                            width: "100%",
                            padding: "0.75rem 1rem",
                            background: "rgba(245, 101, 101, 0.1)",
                            border: "1px solid rgba(245, 101, 101, 0.3)",
                            borderRadius: "var(--border-radius-sm)",
                            color: "#ff6b6b",
                            fontWeight: 500,
                            textTransform: "none",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                        onClick={(e) => {
                            e.stopPropagation()
                            console.log("Logout clicked")
                        }}
                    >
                        <FontAwesomeIcon icon={faSignOutAlt} style={{ fontSize: "18px" }} />
                        <span>Chiqish</span>
                    </Button>
                ) : (
                    // Closed state: Icon only button
                    <Button
                        sx={{
                            width: "100%",
                            minWidth: "unset",
                            padding: "0.75rem",
                            border: "none",
                            color: "#ff6b6b",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                        onClick={(e) => {
                            e.stopPropagation()
                            console.log("Logout clicked")
                        }}
                    >
                        <FontAwesomeIcon icon={faSignOutAlt} style={{ fontSize: "18px" }} />
                    </Button>
                )}
            </Box>
        </Drawer>
    )
}

export default Sidebar
