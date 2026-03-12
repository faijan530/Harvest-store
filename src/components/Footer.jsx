import React from 'react';
import { FaFacebook, FaInstagram, FaYoutube, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer bg-gray-800 text-white py-10">
      <div className="max-w-7xl mx-auto px-5">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="footer-section">
            <h3 className="text-xl font-semibold mb-4 text-green-400">24*7 Fresh Store</h3>
            <p className="text-gray-300 transition-colors duration-300 group-hover:text-gray-200">Your trusted source for fresh vegetables and fruits</p>
          </div>
          <div className="footer-section">
            <h3 className="text-xl font-semibold mb-4 text-light-green">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-gray-300 hover:text-light-green transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="/vegetables" className="text-gray-300 hover:text-light-green transition-colors">
                  Vegetables
                </a>
              </li>
              <li>
                <a href="/fruits" className="text-gray-300 hover:text-light-green transition-colors">
                  Fruits
                </a>
              </li>
              <li>
                <a href="/prices" className="text-gray-300 hover:text-light-green transition-colors">
                  Today's Prices
                </a>
              </li>
            </ul>
          </div>
          <div className="footer-section">
            <h3 className="text-xl font-semibold mb-4 text-light-green">Contact</h3>
            <div className="flex items-center space-x-2 mb-3">
              <i className="fas fa-phone text-white text-lg"></i>
              <span className="text-white font-medium">+91 6201640686</span>
            </div>
            <div className="flex items-start space-x-2">
              <FaMapMarkerAlt className="text-white text-lg mt-1 flex-shrink-0" />
              <div>
                <p className="text-white font-medium">6W7H+WC, Sankha, Jharkhand 815313</p>
                <a 
                  href="https://www.google.com/maps/search/?api=1&query=6W7H%2BWC%2C%20Sankha%2C%20Jharkhand%20815313"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-light-green hover:text-green-400 transition-colors text-sm"
                >
                  View on Google Maps
                </a>
              </div>
            </div>
          </div>
          <div className="footer-section">
            <h3 className="text-xl font-semibold mb-4 text-light-green">Follow Us</h3>
            <div className="flex gap-4 text-2xl">
              <a 
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-400 hover:scale-110 transition-all duration-300"
                aria-label="Facebook"
              >
                <FaFacebook />
              </a>
              <a 
                href="https://www.instagram.com/sufiyan_khan_786001/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-500 hover:text-pink-400 hover:scale-110 transition-all duration-300"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
              <a 
                href="https://www.youtube.com/@sufiyan0124"
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-500 hover:text-red-400 hover:scale-110 transition-all duration-300"
                aria-label="YouTube"
              >
                <FaYoutube />
              </a>
            </div>
          </div>
        </div>
        <div className="footer-bottom border-t border-gray-700 pt-8 text-center">
          <p className="text-gray-400">&copy; 2024 24*7 Fresh Store. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
