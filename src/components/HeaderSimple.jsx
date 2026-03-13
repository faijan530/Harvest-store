import React from 'react';
import { Link } from 'react-router-dom';

const HeaderSimple = () => {
  return (
    <header className="fixed top-0 w-full z-50 bg-blue-600 text-white">
      <div className="max-w-7xl mx-auto px-5">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center group">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
              <span className="text-blue-600 font-bold text-xl">24/7</span>
            </div>
            <span className="ml-3 text-xl font-bold">Fresh Store</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="hover:text-yellow-300 transition">Home</Link>
            <Link to="/vegetables" className="hover:text-yellow-300 transition">Vegetables</Link>
            <Link to="/fruits" className="hover:text-yellow-300 transition">Fruits</Link>
            <Link to="/today-prices" className="hover:text-yellow-300 transition">Prices</Link>
            <Link to="/contact" className="hover:text-yellow-300 transition">Contact</Link>
            {/* Admin link removed for security - access only via direct URL */}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default HeaderSimple;
