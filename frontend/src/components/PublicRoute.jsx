import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth';

/**
 * PublicRoute - Wrapper for authentication pages (login/register)
 * Redirects to appropriate page if user is already authenticated
 */
const PublicRoute = ({ children }) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated()) {
            // Check user role and redirect accordingly
            const userRole = sessionStorage.getItem('userRole');
            if (userRole === 'foodPartner') {
                const foodPartnerId = sessionStorage.getItem('foodPartnerId');
                if (foodPartnerId) {
                    navigate(`/food-partner/${foodPartnerId}`, { replace: true });
                } else {
                    navigate('/', { replace: true });
                }
            } else {
                navigate('/', { replace: true });
            }
        }
    }, [navigate]);

    return <>{children}</>;
};

export default PublicRoute;
