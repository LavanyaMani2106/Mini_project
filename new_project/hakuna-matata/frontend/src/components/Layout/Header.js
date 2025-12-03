import React, { useState, useEffect } from 'react';
import { useStress } from '../../contexts/StressContext';
import { useAuth } from '../../contexts/AuthContext';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, User, LogOut, LayoutDashboard, Book, Activity, BarChart3, Bot } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentStress } = useStress();
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getStressColor = (v) => {
    if (v == null) return 'bg-slate-100 text-slate-600';
    const n = Number(v);
    if (isNaN(n)) return 'bg-slate-100 text-slate-600';
    if (n < 35) return 'bg-emerald-100 text-emerald-700 border-emerald-200';
    if (n < 60) return 'bg-amber-100 text-amber-700 border-amber-200';
    return 'bg-rose-100 text-rose-700 border-rose-200';
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/60 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-indigo-200 group-hover:scale-110 transition-transform duration-300">
              H
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-slate-600">
              Hakuna Matata
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {['Home', 'Features', 'Pricing'].map((item) => (
              <Link 
                key={item}
                to={item === 'Home' ? '/' : `/${item.toLowerCase()}`} 
                className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-indigo-600 rounded-full hover:bg-indigo-50 transition-colors"
              >
                {item}
              </Link>
            ))}
          </nav>
          
          {/* Desktop Auth & Actions */}
          <div className="hidden md:flex items-center gap-4">
            {currentUser ? (
              <>
                <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border ${getStressColor(currentStress)}`}>
                  <div className={`w-2 h-2 rounded-full ${currentStress < 35 ? 'bg-emerald-500' : currentStress < 60 ? 'bg-amber-500' : 'bg-rose-500'} animate-pulse`} />
                  <span className="text-xs font-bold">{currentStress ?? '--'}</span>
                </div>

                <Link to="/stress-detection" className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300 font-medium text-sm">
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </Link>

                <Link to="/activities" className="flex items-center gap-2 px-4 py-2 bg-white text-slate-600 border border-slate-200 rounded-full hover:bg-slate-50 hover:text-indigo-600 transition-all duration-300 font-medium text-sm">
                  <Activity className="w-4 h-4" />
                  Activities
                </Link>

                <Link to="/diary" className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-full hover:shadow-lg hover:shadow-emerald-200 hover:scale-105 transition-all duration-300 font-bold text-sm border border-emerald-400/20">
                  <Book className="w-4 h-4" />
                  My Diary
                </Link>

                <Link to="/analytics" className="flex items-center gap-2 px-4 py-2 bg-white text-slate-600 border border-slate-200 rounded-full hover:bg-slate-50 hover:text-blue-600 transition-all duration-300 font-medium text-sm">
                  <BarChart3 className="w-4 h-4" />
                  Analytics
                </Link>

                <Link to="/chatbot" className="flex items-center gap-2 px-4 py-2 bg-white text-slate-600 border border-slate-200 rounded-full hover:bg-slate-50 hover:text-purple-600 transition-all duration-300 font-medium text-sm">
                  <Bot className="w-4 h-4" />
                  AI Assistant
                </Link>

                <Link to="/profile" className="flex items-center gap-2 px-4 py-2 bg-white text-slate-600 border border-slate-200 rounded-full hover:bg-slate-50 hover:text-indigo-600 transition-all duration-300 font-medium text-sm">
                  <User className="w-4 h-4" />
                  Profile
                </Link>
                
                <div className="h-6 w-px bg-slate-200 mx-2" />
                
                <button onClick={handleLogout} className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-full transition-all" title="Logout">
                  <LogOut className="w-5 h-5" />
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="px-5 py-2.5 text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">
                  Log in
                </Link>
                <Link to="/register" className="px-5 py-2.5 text-sm font-medium text-white bg-slate-900 hover:bg-slate-800 rounded-full shadow-lg shadow-slate-200 transition-all hover:-translate-y-0.5">
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white border-b border-slate-100 shadow-xl animate-in slide-in-from-top-5 duration-200">
          <div className="p-4 space-y-2">
            {['Home', 'Features', 'Pricing'].map((item) => (
              <Link 
                key={item}
                to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                className="block px-4 py-3 text-base font-medium text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-colors"
              >
                {item}
              </Link>
            ))}
            
            <div className="h-px bg-slate-100 my-2" />
            
            {currentUser ? (
              <>
                <Link to="/stress-detection" className="flex items-center gap-3 px-4 py-3 text-base font-medium text-indigo-600 bg-indigo-50 rounded-xl">
                  <LayoutDashboard className="w-5 h-5" />
                  Dashboard
                </Link>
                <Link to="/activities" className="flex items-center gap-3 px-4 py-3 text-base font-medium text-slate-600 hover:bg-slate-50 rounded-xl">
                  <Activity className="w-5 h-5" />
                  Activities
                </Link>
                <Link to="/diary" className="flex items-center gap-3 px-4 py-3 text-base font-medium text-emerald-600 bg-emerald-50 rounded-xl">
                  <Book className="w-5 h-5" />
                  My Diary
                </Link>
                <Link to="/analytics" className="flex items-center gap-3 px-4 py-3 text-base font-medium text-slate-600 hover:bg-slate-50 rounded-xl">
                  <BarChart3 className="w-5 h-5" />
                  Analytics
                </Link>
                <Link to="/chatbot" className="flex items-center gap-3 px-4 py-3 text-base font-medium text-slate-600 hover:bg-slate-50 rounded-xl">
                  <Bot className="w-5 h-5" />
                  AI Assistant
                </Link>
                <Link to="/profile" className="flex items-center gap-3 px-4 py-3 text-base font-medium text-slate-600 hover:bg-slate-50 rounded-xl">
                  <User className="w-5 h-5" />
                  Profile
                </Link>
                <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-base font-medium text-rose-600 hover:bg-rose-50 rounded-xl text-left">
                  <LogOut className="w-5 h-5" />
                  Sign Out
                </button>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-3 pt-2">
                <Link to="/login" className="flex justify-center px-4 py-3 text-base font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors">
                  Log in
                </Link>
                <Link to="/register" className="flex justify-center px-4 py-3 text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-lg shadow-indigo-200 transition-colors">
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;