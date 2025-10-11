import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './pages/Home/HomePage';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Dashboard from './pages/Dashboard/Dashboard';
import StressDetection from './pages/StressDetection/StressDetection';
import Diary from './pages/Diary/Diary';
import Analytics from './pages/Analytics/Analytics';
import Profile from './pages/Profile/Profile';
import Relax from './pages/Relax/Relax';
import Chatbot from './pages/Chatbot/Chatbot';
import Breathing from './pages/Relax/Breathing';
import Music from './pages/Relax/Music';
import './index.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Protected Routes */}
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/stress-detection" 
              element={
                <ProtectedRoute>
                  <StressDetection />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/diary" 
              element={
                <ProtectedRoute>
                  <Diary />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/analytics" 
              element={
                <ProtectedRoute>
                  <Analytics />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } 
            />
            {/* Relaxation Routes */}
            <Route 
              path="/relax" 
              element={
                <ProtectedRoute>
                  <Relax />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/breathing" 
              element={
                <ProtectedRoute>
                  <Breathing />
                </ProtectedRoute>
              } 
            />
            <Route
              path="/music"
              element={
                <ProtectedRoute>
                  <Music />
                </ProtectedRoute>
              }
            />
            <Route
              path="/chatbot"
              element={
                <ProtectedRoute>
                  <Chatbot />
                </ProtectedRoute>
              }
            />

            {/* Fallback route */}
            <Route path="*" element={<HomePage />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;