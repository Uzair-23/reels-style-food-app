import axios from 'axios';

/**
 * Simple auth check using stored flag in sessionStorage
 * This works with cookie-based auth
 */
export const isAuthenticated = () => {
    // Check if we have a session flag indicating authentication
    return sessionStorage.getItem('isLoggedIn') === 'true';
};

export const setAuthFlag = () => {
    sessionStorage.setItem('isLoggedIn', 'true');
};

export const clearAuthFlag = () => {
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('userRole'); // Also clear user role
    sessionStorage.removeItem('foodPartnerId'); // Also clear food partner ID
};

/**
 * Logout function - clears auth flag and calls backend logout
 * @param {string} userType - 'user' or 'foodPartner'
 * @returns {Promise<void>}
 */
export const logout = async (userType = 'user') => {
    try {
        const endpoint = userType === 'foodPartner' 
            ? 'http://localhost:3000/api/auth/food-partner/logout'
            : 'http://localhost:3000/api/auth/user/logout';
        
        await axios.get(endpoint, { withCredentials: true });
    } catch (error) {
        console.error('Logout error:', error);
    } finally {
        // Always clear the auth flag, even if the backend call fails
        clearAuthFlag();
    }
};
