import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-700 ${
      isScrolled ? 'bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 shadow-2xl backdrop-blur-xl' : 'bg-gradient-to-r from-indigo-800 via-purple-800 to-pink-800 shadow-2xl backdrop-blur-lg'
    }`}>
      <div className="max-w-7xl mx-auto px-5">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center group">
            <div className="relative">
              <div className="w-16 h-16 rounded-full overflow-hidden bg-gradient-to-br from-white via-gray-50 to-gray-100 shadow-2xl group-hover:shadow-3xl transition-all duration-500 group-hover:scale-110 border-4 border-white/30 backdrop-blur-sm">
                <img 
                  src="/image.png" 
                  alt="24*7 Fresh Store Logo" 
                  className="w-full h-full object-contain p-2 transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              {/* Animated ring effect */}
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 animate-pulse shadow-lg"></div>
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400/20 to-pink-400/20 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400/30 to-purple-400/30 opacity-0 group-hover:opacity-100 transition-all duration-700 blur-md"></div>
            </div>
            <span className="text-2xl font-black text-white ml-4 drop-shadow-2xl bg-gradient-to-r from-yellow-200 via-pink-200 to-purple-200 bg-clip-text text-transparent transition-all duration-500 group-hover:from-yellow-300 group-hover:via-pink-300 group-hover:to-purple-300">24*7 Fresh Store</span>
          </Link>
          
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              <li>
                <Link 
                  to="/" 
                  className={`relative text-white hover:text-yellow-300 font-bold transition-all duration-500 px-4 py-2 rounded-xl hover:bg-white/10 hover:backdrop-blur-sm hover:shadow-lg ${
                    isActive('/') ? 'text-yellow-300 bg-white/10 backdrop-blur-sm shadow-lg' : ''
                  }`}
                >
                  Home
                  {isActive('/') && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-yellow-300 rounded-full"></span>
                  )}
                </Link>
              </li>
              <li>
                <Link 
                  to="/vegetables" 
                  className={`relative text-white hover:text-yellow-300 font-bold transition-all duration-500 px-4 py-2 rounded-xl hover:bg-white/10 hover:backdrop-blur-sm hover:shadow-lg ${
                    isActive('/vegetables') ? 'text-yellow-300 bg-white/10 backdrop-blur-sm shadow-lg' : ''
                  }`}
                >
                  Vegetables
                  {isActive('/vegetables') && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-yellow-300 rounded-full"></span>
                  )}
                </Link>
              </li>
              <li>
                <Link 
                  to="/fruits" 
                  className={`relative text-white hover:text-yellow-300 font-bold transition-all duration-500 px-4 py-2 rounded-xl hover:bg-white/10 hover:backdrop-blur-sm hover:shadow-lg ${
                    isActive('/fruits') ? 'text-yellow-300 bg-white/10 backdrop-blur-sm shadow-lg' : ''
                  }`}
                >
                  Fruits
                  {isActive('/fruits') && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-yellow-300 rounded-full"></span>
                  )}
                </Link>
              </li>
              <li>
                <Link 
                  to="/beverages" 
                  className={`relative text-white hover:text-yellow-300 font-bold transition-all duration-500 px-4 py-2 rounded-xl hover:bg-white/10 hover:backdrop-blur-sm hover:shadow-lg ${
                    isActive('/beverages') ? 'text-yellow-300 bg-white/10 backdrop-blur-sm shadow-lg' : ''
                  }`}
                >
                  Beverages
                  {isActive('/beverages') && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-yellow-300 rounded-full"></span>
                  )}
                </Link>
              </li>
              <li>
                <Link 
                  to="/today-prices" 
                  className={`relative text-white hover:text-yellow-300 font-bold transition-all duration-500 px-4 py-2 rounded-xl hover:bg-white/10 hover:backdrop-blur-sm hover:shadow-lg ${
                    isActive('/today-prices') ? 'text-yellow-300 bg-white/10 backdrop-blur-sm shadow-lg' : ''
                  }`}
                >
                  Today's Prices
                  {isActive('/today-prices') && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-yellow-300 rounded-full"></span>
                  )}
                </Link>
              </li>
              <li>
                <a 
                  href="/#contact" 
                  className="relative text-white hover:text-yellow-300 font-bold transition-all duration-500 px-4 py-2 rounded-xl hover:bg-white/10 hover:backdrop-blur-sm hover:shadow-lg"
                  onClick={closeMenu}
                >
                  Contact
                </a>
              </li>
            </ul>
          </nav>
          
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg text-white hover:text-yellow-300 hover:bg-white/10 transition-all duration-200"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-300 ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}>
          <div className="bg-white/10 backdrop-blur-md border-t border-white/20 py-4">
            <ul>
              <li>
                <Link
                  to="/"
                  className="block px-4 py-3 text-white hover:text-yellow-300 font-bold transition-all duration-200"
                  onClick={closeMenu}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/vegetables"
                  className="block px-4 py-3 text-white hover:text-yellow-300 font-bold transition-all duration-200"
                  onClick={closeMenu}
                >
                  Vegetables
                </Link>
              </li>
              <li>
                <Link
                  to="/fruits"
                  className="block px-4 py-3 text-white hover:text-yellow-300 font-bold transition-all duration-200"
                  onClick={closeMenu}
                >
                  Fruits
                </Link>
              </li>
              <li>
                <Link
                  to="/beverages"
                  className="block px-4 py-3 text-white hover:text-yellow-300 font-bold transition-all duration-200"
                  onClick={closeMenu}
                >
                  Beverages
                </Link>
              </li>
              <li>
                <Link 
                  to="/today-prices" 
                  className="block px-4 py-3 text-white hover:text-yellow-300 font-bold transition-all duration-200"
                  onClick={closeMenu}
                >
                  Today's Prices
                </Link>
              </li>
              <li>
                <a 
                  href="/#contact" 
                  className="block px-4 py-3 text-white hover:text-yellow-300 font-bold transition-all duration-200"
                  onClick={closeMenu}
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
