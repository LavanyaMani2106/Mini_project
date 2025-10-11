import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <Header />
      
      {/* Hero Section - Mobile Optimized */}
      <section className="py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-4 sm:mb-6">
              Take Control of Your 
              <span className="text-primary block sm:inline"> Stress</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
              AI-powered stress management with real-time monitoring, personalized insights, and proven relaxation techniques.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link 
                to="/register" 
                className="w-full sm:w-auto bg-primary text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-opacity-90 transition-colors text-center"
              >
                Start Free Trial
              </Link>
              <Link 
                to="/features" 
                className="w-full sm:w-auto border border-primary text-primary px-6 py-3 rounded-lg text-lg font-semibold hover:bg-primary hover:text-white transition-colors text-center"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Preview - Stack on mobile */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center p-4 sm:p-6">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <span className="text-white text-xl sm:text-2xl">🎯</span>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Detect Stress</h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Real-time AI analysis of your stress levels using facial recognition.
              </p>
            </div>
            
            <div className="text-center p-4 sm:p-6">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <span className="text-white text-xl sm:text-2xl">📊</span>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Track Progress</h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Comprehensive analytics and insights into your stress patterns.
              </p>
            </div>
            
            <div className="text-center p-4 sm:p-6">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <span className="text-white text-xl sm:text-2xl">🧘</span>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Relax & Recover</h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Personalized relaxation exercises and activities.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;