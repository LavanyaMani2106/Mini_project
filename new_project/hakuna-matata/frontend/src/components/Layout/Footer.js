import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white">
                <span className="font-serif font-bold text-lg">H</span>
              </div>
              <span className="font-serif text-xl font-bold text-white tracking-tight">
                Hakuna <span className="text-primary-400">Matata</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Your AI-powered companion for stress management and mental wellness. 
              Find your balance with personalized insights and relaxation techniques.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors"><Facebook size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors"><Twitter size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors"><Instagram size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors"><Linkedin size={20} /></a>
            </div>
          </div>
          
          {/* Product */}
          <div>
            <h4 className="font-serif font-semibold text-white text-lg mb-6">Product</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/features" className="hover:text-primary-400 transition-colors">Features</Link></li>
              <li><Link to="/pricing" className="hover:text-primary-400 transition-colors">Pricing</Link></li>
              <li><Link to="/stress-center" className="hover:text-primary-400 transition-colors">Stress Center</Link></li>
              <li><Link to="/activities" className="hover:text-primary-400 transition-colors">Activities</Link></li>
            </ul>
          </div>
          
          {/* Resources */}
          <div>
            <h4 className="font-serif font-semibold text-white text-lg mb-6">Resources</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-primary-400 transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-primary-400 transition-colors">Community</a></li>
              <li><a href="#" className="hover:text-primary-400 transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-primary-400 transition-colors">Wellness Guide</a></li>
            </ul>
          </div>
          
          {/* Company */}
          <div>
            <h4 className="font-serif font-semibold text-white text-lg mb-6">Company</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-primary-400 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-primary-400 transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-primary-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary-400 transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Hakuna Matata. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>Made with</span>
            <Heart size={16} className="text-red-500 fill-current" />
            <span>Heart</span>
            <span>for mental wellness</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;