import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../../service/auth';
import Loading from '../../loading/loading';
import urls from '../../../../src/constants/urls';

const Home = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate(); // Optional: For internal redirects

    useEffect(() => {
        const checkAdmin = async () => {
            try {
                // Create a 3-second delay Promise
                const delay = new Promise(resolve => setTimeout(resolve, 3000));

                // Run API call and delay concurrently
                const [isAdmin] = await Promise.all([
                    AuthService.checkAdminWithCredentials(),
                    delay
                ]);

                // No access, redirect to main site
                if (!isAdmin) {
                    window.location.href = urls.mainSiteUrl;
                    return;
                }

                setIsAdmin(true);
            } catch (error) {
                console.error('Admin verification failed:', error);
                // On error, redirect to main site
                window.location.href = urls.mainSiteUrl;
            } finally {
                setIsLoading(false);
            }
        };

        checkAdmin();
    }, []);

    if (isLoading) {
        return <Loading message="Verifying access..." />;
    }

    if (!isAdmin) {
        return null;
    }

    navigate('/dashboard');
};

export default Home;