import React, { useState } from 'react';
import { Drawer, Box, Typography, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Button, Avatar } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCrown, faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import { links } from "../../../constants/page-links";

const MINI_WIDTH = '60px'; // Mini sidebar width for icons only
const FULL_WIDTH = 'var(--sidebar-width)'; // Assume var(--sidebar-width) is defined, e.g., 240px

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false); // Collapsed by default (mini mode)
    const currentPath = window.location.pathname;

    const handleToggle = (e) => {
        e.stopPropagation(); // Prevent event bubbling
        setIsOpen(!isOpen); // Toggle sidebar only when header is clicked
    };

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: isOpen ? FULL_WIDTH : MINI_WIDTH,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: isOpen ? FULL_WIDTH : MINI_WIDTH,
                    height: '100vh',
                    background: 'linear-gradient(135deg, var(--gray-900) 0%, var(--gray-800) 100%)',
                    color: 'white',
                    zIndex: 1000,
                    transition: 'width var(--transition)',
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: 'var(--box-shadow-lg)',
                    overflowX: 'hidden', // Prevent horizontal scroll in mini mode
                },
            }}
        >
            {/* Sidebar Header - Toggle only when clicking here */}
            <Box
                onClick={handleToggle}
                sx={{
                    padding: isOpen ? '2rem' : '1rem',
                    textAlign: 'center',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                    background: 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(10px)',
                    whiteSpace: 'nowrap',
                    cursor: 'pointer', // Indicate clickable area
                }}
            >
                <Box
                    sx={{
                        width: '60px',
                        height: '60px',
                        background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))',
                        borderRadius: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 1rem',
                        boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)',
                        position: 'relative',
                        overflow: 'hidden',
                        '&::before': {
                            content: '""',
                            position: 'absolute',
                            top: '-50%',
                            left: '-50%',
                            width: '200%',
                            height: '200%',
                            background: 'linear-gradient(45deg, transparent, rgba(255,255,255,0.3), transparent)',
                            transform: 'rotate(45deg)',
                            animation: 'shine 3s infinite',
                        },
                    }}
                >
                    <FontAwesomeIcon icon={faCrown} style={{ fontSize: '24px', position: 'relative', zIndex: 2 }} />
                </Box>
                {isOpen && (
                    <>
                        <Typography
                            variant="h4"
                            sx={{
                                fontSize: '1.5rem',
                                fontWeight: 700,
                                marginBottom: '0.25rem',
                                background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                            }}
                        >
                            PRIME77
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{ fontSize: '0.875rem', color: 'var(--gray-400)', margin: 0 }}
                        >
                            Control Panel
                        </Typography>
                    </>
                )}
            </Box>

            {/* Sidebar Navigation */}
            <List sx={{ flex: 1, padding: '1rem 0' }}>
                {links.map((item) => {
                    const isActive = currentPath === item.href;
                    return (
                        <ListItem
                            key={item.text}
                            disablePadding
                            sx={{
                                '& .MuiListItemButton-root': {
                                    padding: isOpen ? '1rem 2rem' : '1rem',
                                    color: 'rgba(255, 255, 255, 0.8)',
                                    transition: 'var(--transition)',
                                    position: 'relative',
                                    fontSize: '0.95rem',
                                    fontWeight: 500,
                                    background: isActive ? 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))' : 'none',
                                    '&:hover': isActive ? {} : {
                                        background: 'rgba(255, 255, 255, 0.1)',
                                        color: 'white',
                                    },
                                    justifyContent: isOpen ? 'flex-start' : 'center',
                                },
                            }}
                        >
                            <ListItemButton
                                component="a"
                                href={item.href}
                                onClick={(e) => e.stopPropagation()} // Prevent toggle on menu item click
                            >
                                <ListItemIcon
                                    sx={{
                                        width: '20px',
                                        marginRight: isOpen ? '1rem' : 0,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: 'inherit',
                                        minWidth: 'unset',
                                    }}
                                >
                                    <FontAwesomeIcon icon={item.icon} style={{ fontSize: '20px' }} />
                                </ListItemIcon>
                                {isOpen && <ListItemText primary={item.text} />}
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        right: 0,
                                        top: '50%',
                                        transform: isActive ? 'translateY(-50%) scaleY(1)' : 'translateY(-50%) scaleY(0)',
                                        width: '4px',
                                        height: '30px',
                                        background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))',
                                        borderRadius: '2px 0 0 2px',
                                        opacity: isActive ? 1 : 0,
                                        transition: 'var(--transition)',
                                    }}
                                />
                            </ListItemButton>
                        </ListItem>
                    );
                })}
            </List>

            {/* Sidebar Footer */}
            <Box
                sx={{
                    padding: isOpen ? '1.5rem' : '1rem',
                    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                    whiteSpace: 'nowrap',
                }}
            >
                {isOpen && (
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            marginBottom: '1rem',
                            padding: '1rem',
                            background: 'rgba(255, 255, 255, 0.05)',
                            borderRadius: 'var(--border-radius-sm)',
                            backdropFilter: 'blur(10px)',
                        }}
                    >
                        <Avatar
                            sx={{
                                width: '40px',
                                height: '40px',
                                background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginRight: '0.75rem',
                            }}
                        >
                            <FontAwesomeIcon icon={faUser} style={{ fontSize: '20px' }} />
                        </Avatar>
                        <Box sx={{ flex: 1 }}>
                            <Typography sx={{ fontWeight: 600, fontSize: '0.9rem' }}>Admin</Typography>
                            <Typography sx={{ fontSize: '0.75rem', color: 'var(--gray-400)' }}>
                                Super Admin
                            </Typography>
                        </Box>
                    </Box>
                )}
                <Button
                    sx={{
                        width: '100%',
                        padding: isOpen ? '0.75rem 1rem' : '0.75rem',
                        background: 'rgba(245, 101, 101, 0.1)',
                        border: '1px solid rgba(245, 101, 101, 0.3)',
                        borderRadius: 'var(--border-radius-sm)',
                        color: '#ff6b6b',
                        fontWeight: 500,
                        textTransform: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: isOpen ? 'center' : 'center',
                        gap: isOpen ? '0.5rem' : 0,
                        '&:hover': {
                            background: 'rgba(245, 101, 101, 0.2)',
                            transform: 'translateY(-2px)',
                        },
                    }}
                    onClick={(e) => {
                        e.stopPropagation(); // Prevent sidebar toggle on logout click
                        console.log('Logout clicked'); // Replace with actual logout function
                    }}
                >
                    <FontAwesomeIcon icon={faSignOutAlt} style={{ fontSize: '20px' }} />
                    {isOpen && <span>Chiqish</span>}
                </Button>
            </Box>
        </Drawer>
    );
};

export default Sidebar;