import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile-Optimized Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl sm:text-2xl font-bold text-primary">Hakuna Matata</h1>
            </div>
            
            <div className="flex items-center space-x-2 sm:space-x-4">
              <span className="text-xs sm:text-sm text-gray-700 hidden sm:block">
                Welcome, {currentUser?.name}
              </span>
              <button 
                onClick={handleLogout}
                className="bg-red-600 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-sm hover:bg-red-700 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content - Mobile Optimized */}
      <div className="max-w-7xl mx-auto py-4 sm:py-6 px-3 sm:px-6 lg:px-8">
        <div className="space-y-4 sm:space-y-6">
          
          {/* Welcome Card */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-4 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Welcome to Your Stress Management Dashboard
              </h3>
              <div className="mt-2 max-w-xl text-sm text-gray-500">
                <p>Track your stress levels, access relaxation tools, and monitor your progress.</p>
              </div>
            </div>
          </div>

          {/* Stats Grid - Stack on mobile */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {/* Stress Level Card */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-4 sm:p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-primary rounded-md p-2 sm:p-3">
                    <span className="text-white text-xl sm:text-2xl">🎯</span>
                  </div>
                  <div className="ml-4 flex-1 min-w-0">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Current Stress</dt>
                      <dd>
                        <div className="text-lg font-medium text-gray-900">65/100</div>
                        <div className="text-sm text-green-600">↓ 12% from yesterday</div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            {/* Weekly Progress Card */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-4 sm:p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-secondary rounded-md p-2 sm:p-3">
                    <span className="text-white text-xl sm:text-2xl">📊</span>
                  </div>
                  <div className="ml-4 flex-1 min-w-0">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Weekly Progress</dt>
                      <dd>
                        <div className="text-lg font-medium text-gray-900">4/7 days</div>
                        <div className="text-sm text-gray-500">Completed</div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            {/* Relaxation Time Card */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-4 sm:p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-accent rounded-md p-2 sm:p-3">
                    <span className="text-white text-xl sm:text-2xl">🧘</span>
                  </div>
                  <div className="ml-4 flex-1 min-w-0">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Relaxation Time</dt>
                      <dd>
                        <div className="text-lg font-medium text-gray-900">25 min</div>
                        <div className="text-sm text-gray-500">Today's total</div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions - Responsive Grid */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-4 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
                <button 
                  onClick={() => navigate('/stress-detection')}
                  className="bg-blue-50 hover:bg-blue-100 p-3 sm:p-4 rounded-lg text-center transition-colors active:scale-95"
                >
                  <div className="text-xl sm:text-2xl mb-2">🎯</div>
                  <div className="font-medium text-blue-700 text-xs sm:text-sm">Stress Check</div>
                </button>
                
                <button className="bg-green-50 hover:bg-green-100 p-3 sm:p-4 rounded-lg text-center transition-colors active:scale-95">
                  <div className="text-xl sm:text-2xl mb-2">🧘</div>
                  <div className="font-medium text-green-700 text-xs sm:text-sm">Breathing</div>
                </button>
                
                <button 
                  onClick={() => navigate('/diary')}
                  className="bg-purple-50 hover:bg-purple-100 p-3 sm:p-4 rounded-lg text-center transition-colors active:scale-95"
                >
                  <div className="text-xl sm:text-2xl mb-2">📝</div>
                  <div className="font-medium text-purple-700 text-xs sm:text-sm">Diary</div>
                </button>
                
                <button 
                  onClick={() => navigate('/music')}
                  className="bg-orange-50 hover:bg-orange-100 p-3 sm:p-4 rounded-lg text-center transition-colors active:scale-95"
                >
                  <div className="text-xl sm:text-2xl mb-2">🎵</div>
                  <div className="font-medium text-orange-700 text-xs sm:text-sm">Music</div>
                </button>

                <button
                  onClick={() => navigate('/analytics')}
                  className="bg-indigo-50 hover:bg-indigo-100 p-3 sm:p-4 rounded-lg text-center transition-colors active:scale-95"
                >
                  <div className="text-xl sm:text-2xl mb-2">📊</div>
                  <div className="font-medium text-indigo-700 text-xs sm:text-sm">Analytics</div>
                </button>

                <button
                  onClick={() => navigate('/chatbot')}
                  className="bg-teal-50 hover:bg-teal-100 p-3 sm:p-4 rounded-lg text-center transition-colors active:scale-95"
                >
                  <div className="text-xl sm:text-2xl mb-2">🤖</div>
                  <div className="font-medium text-teal-700 text-xs sm:text-sm">AI Chatbot</div>
                </button>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-4 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                  <span className="text-sm text-gray-600 flex-1">Stress check completed - 65/100</span>
                  <span className="text-xs text-gray-400">2h ago</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                  <span className="text-sm text-gray-600 flex-1">Breathing exercise - 10 min</span>
                  <span className="text-xs text-gray-400">4h ago</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0"></div>
                  <span className="text-sm text-gray-600 flex-1">Diary entry created</span>
                  <span className="text-xs text-gray-400">1d ago</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;