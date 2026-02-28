import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth';

/**
 * ProtectedRoute - Wrapper for routes that require authentication
 * Redirects to /register if user is not authenticated
 */
const ProtectedRoute = ({ children }) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated()) {
            // User is not logged in, redirect to register
            navigate('/register', { replace: true });
        }
    }, [navigate]);

    // Only render children if authenticated
    if (!isAuthenticated()) {
        return null;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
