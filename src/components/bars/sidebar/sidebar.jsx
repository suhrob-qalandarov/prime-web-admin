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
import { faCrown, faSignOutAlt, faUser } from "@fortawesome/free-solid-svg-icons"
import { links } from "../../../constants/page-links"

const MINI_WIDTH = "60px"
const FULL_WIDTH = "var(--sidebar-width)"

const Sidebar = ({ isOpen, setIsOpen }) => {
    const currentPath = window.location.pathname

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
                    padding: isOpen ? "2rem" : "1rem",
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
                        background: "linear-gradient(135deg, var(--primary-color), var(--secondary-color))",
                        borderRadius: "16px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "0 auto 1rem",
                        boxShadow: "0 8px 25px rgba(102, 126, 234, 0.3)",
                        position: "relative",
                        overflow: "hidden",
                        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                        "&::before": {
                            content: '""',
                            position: "absolute",
                            top: "-50%",
                            left: "-50%",
                            width: "200%",
                            height: "200%",
                            background: "linear-gradient(45deg, transparent, rgba(255,255,255,0.3), transparent)",
                            transform: "rotate(45deg)",
                            animation: "shine 3s infinite",
                        },
                    }}
                >
                    <FontAwesomeIcon
                        icon={faCrown}
                        style={{
                            fontSize: isOpen ? "24px" : "18px",
                            position: "relative",
                            zIndex: 2,
                            transition: "font-size 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                        }}
                    />
                </Box>
                {isOpen && (
                    <>
                        <Typography
                            variant="h4"
                            sx={{
                                fontSize: "1.5rem",
                                fontWeight: 700,
                                marginBottom: "0.25rem",
                                background: "linear-gradient(135deg, var(--primary-color), var(--secondary-color))",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                backgroundClip: "text",
                            }}
                        >
                            PRIME77
                        </Typography>
                        <Typography variant="body2" sx={{ fontSize: "0.875rem", color: "var(--gray-400)", margin: 0 }}>
                            Control Panel
                        </Typography>
                    </>
                )}
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
                            <ListItemButton component="a" href={item.href} onClick={(e) => e.stopPropagation()}>
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
                                {isOpen && <ListItemText primary={item.text} />}
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
                <Button
                    sx={{
                        width: "100%",
                        padding: isOpen ? "0.75rem 1rem" : "0.75rem",
                        background: "rgba(245, 101, 101, 0.1)",
                        border: isOpen ? "1px solid rgba(245, 101, 101, 0.3)" : "none",
                        borderRadius: "var(--border-radius-sm)",
                        color: "#ff6b6b",
                        fontWeight: 500,
                        textTransform: "none",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: isOpen ? "0.5rem" : 0,
                        boxShadow: isOpen ? "none" : "0 4px 10px rgba(245, 101, 101, 0.2)",
                        "&:hover": {
                            background: "rgba(245, 101, 101, 0.2)",
                            boxShadow: isOpen ? "none" : "0 6px 15px rgba(245, 101, 101, 0.3)",
                            transform: "translateY(-2px)",
                        },
                        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    }}
                    onClick={(e) => {
                        e.stopPropagation()
                        console.log("Logout clicked")
                    }}
                >
                    <FontAwesomeIcon
                        icon={faSignOutAlt}
                        style={{
                            fontSize: isOpen ? "18px" : "16px",
                            transition: "font-size 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                        }}
                    />
                    {isOpen && <span>Chiqish</span>}
                </Button>
            </Box>
        </Drawer>
    )
}

export default Sidebar
