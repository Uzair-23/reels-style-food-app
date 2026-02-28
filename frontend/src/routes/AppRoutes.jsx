import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserRegister from '../pages/auth/UserRegister';
import ChooseRegister from '../pages/auth/ChooseRegister';
import UserLogin from '../pages/auth/UserLogin';
import FoodPartnerRegister from '../pages/auth/FoodPartnerRegister';
import FoodPartnerLogin from '../pages/auth/FoodPartnerLogin';
import Home from '../pages/general/Home';
import Saved from '../pages/general/Saved';
import BottomNav from '../components/BottomNav';
import CreateFood from '../pages/food-partner/CreateFood';
import Profile from '../pages/food-partner/Profile';
import UserProfile from '../pages/user/UserProfile';
import PublicRoute from '../components/PublicRoute';
import ProtectedRoute from '../components/ProtectedRoute';

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                {/* Public routes - redirect to home if authenticated */}
                <Route path="/register" element={<PublicRoute><ChooseRegister /></PublicRoute>} />
                <Route path="/user/register" element={<PublicRoute><UserRegister /></PublicRoute>} />
                <Route path="/user/login" element={<PublicRoute><UserLogin /></PublicRoute>} />
                <Route path="/food-partner/register" element={<PublicRoute><FoodPartnerRegister /></PublicRoute>} />
                <Route path="/food-partner/login" element={<PublicRoute><FoodPartnerLogin /></PublicRoute>} />
                
                {/* Protected routes - require authentication */}
                <Route path="/" element={<ProtectedRoute><Home /><BottomNav /></ProtectedRoute>} />
                <Route path="/saved" element={<ProtectedRoute><Saved /><BottomNav /></ProtectedRoute>} />
                <Route path="/user-profile" element={<ProtectedRoute><UserProfile /><BottomNav /></ProtectedRoute>} />
                <Route path="/create-food" element={<ProtectedRoute><CreateFood /></ProtectedRoute>} />
                <Route path="/food-partner/:id" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            </Routes>
        </Router>
    )
}

export default AppRoutes