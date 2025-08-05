import React, { useEffect } from 'react';
import './App.css';
import './styles/auth.css';
import './styles/notifications.css';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Events from './pages/Events';
import Devices from './pages/Devices';
import Finance from './pages/Finance';
import Groups from './pages/Groups';
import Analytics from './pages/Analytics';
import DiaryAnalysis from './pages/DiaryAnalysis';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import PageAnimation from './components/PageAnimation';
import { useHamburger } from './hooks/useHamburger';
import { NotificationProvider } from './contexts/NotificationContext';
import { AuthProvider } from './contexts/AuthContext';
import NotificationContainer from './components/NotificationContainer';
import ProtectedRoute from './components/ProtectedRoute';

// Extend Window interface to include our custom function
declare global {
  interface Window {
    navigateTo: (path: string) => void;
  }
}

function App() {
  // Initialize hamburger menu functionality
  useHamburger();
  
  // Set up the navigation function
  useEffect(() => {
    window.navigateTo = (path: string) => {
      window.location.href = path;
    };
  }, []);

  return (
    <Router>
      <NotificationProvider>
        <AuthProvider>
          <PageAnimation>
            <div className="main">
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } />
                <Route path="/users" element={
                  <ProtectedRoute>
                    <Users />
                  </ProtectedRoute>
                } />
                <Route path="/events" element={
                  <ProtectedRoute>
                    <Events />
                  </ProtectedRoute>
                } />
                <Route path="/group-management" element={
                  <ProtectedRoute>
                    <Groups />
                  </ProtectedRoute>
                } />
                <Route path="/devices" element={
                  <ProtectedRoute>
                    <Devices />
                  </ProtectedRoute>
                } />
                <Route path="/finance" element={
                  <ProtectedRoute>
                    <Finance />
                  </ProtectedRoute>
                } />
                <Route path="/analytics" element={
                  <ProtectedRoute>
                    <Analytics />
                  </ProtectedRoute>
                } />
                <Route path="/diary-analysis" element={
                  <ProtectedRoute>
                    <DiaryAnalysis />
                  </ProtectedRoute>
                } />
                <Route path="/" element={<Navigate to="/login" replace />} />
              </Routes>
            </div>
          </PageAnimation>
          <NotificationContainer />
        </AuthProvider>
      </NotificationProvider>
    </Router>
  );
}

export default App;