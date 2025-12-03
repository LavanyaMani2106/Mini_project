import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { StressProvider } from './contexts/StressContext';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './pages/Home/HomePage';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Features from './pages/Features/Features';
import Dashboard from './pages/Dashboard/Dashboard';
import StressCenter from './pages/StressCenter/StressCenter';
import StressDetection from './pages/StressDetection/StressDetection';
import Activities from './pages/Activities/Activities';
import PrivacyDiary from './pages/Diary/PrivacyDiary';
import Analytics from './pages/Analytics/Analytics';
import Profile from './pages/Profile/Profile';
import Relax from './pages/Relax/Relax';
import Chatbot from './pages/Chatbot/Chatbot';
import Breathing from './pages/Relax/Breathing';
import Music from './pages/Relax/Music';
import MorningFlow from './pages/Yoga/MorningFlow';
import Mudras from './pages/Yoga/Mudras';
import DanceTherapy from './pages/Dance/Therapy';
import Patatap from './pages/Music/Patatap';
import CalmingPiano from './pages/Music/CalmingPiano';
import NatureSounds from './pages/Sounds/Nature';
import EveningRelaxation from './pages/Relax/EveningRelaxation';
import BodyScan from './pages/Relax/BodyScan';
import TypingChallenge from './pages/Games/TypingChallenge';
import PuzzleZen from './pages/Games/PuzzleZen';
import MeditationGarden from './pages/Experiences/MeditationGarden';
import VirtualBeach from './pages/Experiences/VirtualBeach';
import './index.css';

function App() {
  return (
    <AuthProvider>
      <StressProvider>
        <Router>
          <div className="flex flex-col min-h-screen">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/features" element={<Features />} />
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
                path="/activities" 
                element={
                  <ProtectedRoute>
                    <Activities />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/stress-center" 
                element={
                  <ProtectedRoute>
                    <StressCenter />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/diary" 
                element={
                  <ProtectedRoute>
                    <PrivacyDiary />
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

              {/* Specific Activity Routes */}
              <Route path="/yoga/morning-flow" element={<ProtectedRoute><MorningFlow /></ProtectedRoute>} />
              <Route path="/yoga/mudras" element={<ProtectedRoute><Mudras /></ProtectedRoute>} />
              <Route path="/dance/therapy" element={<ProtectedRoute><DanceTherapy /></ProtectedRoute>} />
              <Route path="/music/patatap" element={<ProtectedRoute><Patatap /></ProtectedRoute>} />
              <Route path="/music/calming-piano" element={<ProtectedRoute><CalmingPiano /></ProtectedRoute>} />
              <Route path="/sounds/nature" element={<ProtectedRoute><NatureSounds /></ProtectedRoute>} />
              <Route path="/relax/evening" element={<ProtectedRoute><EveningRelaxation /></ProtectedRoute>} />
              <Route path="/relax/body-scan" element={<ProtectedRoute><BodyScan /></ProtectedRoute>} />
              <Route path="/games/typing-challenge" element={<ProtectedRoute><TypingChallenge /></ProtectedRoute>} />
              <Route path="/games/puzzle-zen" element={<ProtectedRoute><PuzzleZen /></ProtectedRoute>} />
              <Route path="/experiences/meditation-garden" element={<ProtectedRoute><MeditationGarden /></ProtectedRoute>} />
              <Route path="/experiences/virtual-beach" element={<ProtectedRoute><VirtualBeach /></ProtectedRoute>} />

              {/* Fallback route */}
              <Route path="*" element={<HomePage />} />
            </Routes>
          </div>
        </Router>
      </StressProvider>
    </AuthProvider>
  );
}

export default App;