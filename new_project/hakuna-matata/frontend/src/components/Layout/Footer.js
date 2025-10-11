import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white mt-12 sm:mt-20">
      <div className="max-w-7xl mx-auto py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-3 sm:mb-4">Hakuna Matata</h3>
            <p className="text-gray-300 text-sm">Your AI-powered stress management companion.</p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Product</h4>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>Features</li>
              <li>Pricing</li>
              <li>API</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Support</h4>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>Help Center</li>
              <li>Contact Us</li>
              <li>Status</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Company</h4>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>About</li>
              <li>Blog</li>
              <li>Careers</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-gray-700 text-center text-gray-300 text-sm">
          <p>&copy; 2024 Hakuna Matata. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;