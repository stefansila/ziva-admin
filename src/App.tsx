import React, { useEffect } from 'react';
import './App.css';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Devices from './pages/Devices';
import Finance from './pages/Finance';
import Groups from './pages/Groups';
import Analytics from './pages/Analytics';
import DiaryAnalysis from './pages/DiaryAnalysis';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import PageAnimation from './components/PageAnimation';
import { useHamburger } from './hooks/useHamburger';

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
      <PageAnimation>
        <div className="main">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/users" element={<Users />} />
            <Route path="/group-management" element={<Groups />} />
            <Route path="/devices" element={<Devices />} />
            <Route path="/finance" element={<Finance />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/diary-analysis" element={<DiaryAnalysis />} />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </div>
      </PageAnimation>
    </Router>
  );
}

export default App;
