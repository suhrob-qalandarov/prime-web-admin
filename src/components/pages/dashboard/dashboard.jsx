import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../../service/auth';
import Loading from '../../loading/loading';

const Dashboard = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate(); // Optional: For internal redirects

    useEffect(() => {
        const checkAdmin = async () => {
            try {
                // Create a 5-second delay Promise
                const delay = new Promise(resolve => setTimeout(resolve, 5000));

                // Run API call and delay concurrently
                const [userData] = await Promise.all([
                    AuthService.admin(), // Call /auth/admin endpoint
                    delay
                ]);

                if (!userData || !userData.isAdmin || !userData.roles.includes('ADMIN')) {
                    // No data, not admin, or no ADMIN role: Redirect to main site
                    window.location.href = 'https://prime.howdy.uz'; // Replace with your main site URL
                    return;
                }

                // Admin confirmed: Allow dashboard access
                setIsAdmin(true);
            } catch (error) {
                console.error('Admin verification failed:', error);
                // On error, redirect to main site
                window.location.href = 'https://prime.howdy.uz'; // Replace with your main site URL
            } finally {
                setIsLoading(false);
            }
        };

        checkAdmin();
    }, []);

    if (isLoading) {
        return <Loading message="Verifying admin access..." />; // Use your loading animation
    }

    if (!isAdmin) {
        // Fallback: Shouldn't render due to redirect, but included for safety
        return null;
    }

    return (
        <div>
            <h1>Dashboard</h1>
            {/* Add your admin dashboard content here */}
        </div>
    );
};

export default Dashboard;