import React from 'react';

const Footer = () => {
  return (
    <footer className="footer bg-gray-800 text-white py-10">
      <div className="max-w-7xl mx-auto px-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
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
            <p className="text-gray-300">NH-75 Highway, Kundi Shankha, MP</p>
            <p className="text-gray-300">+91 98765 43210</p>
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
