import React from 'react';
import { FaFacebook, FaInstagram, FaYoutube, FaMapMarkerAlt } from 'react-icons/fa';

const FooterSimple = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-7xl mx-auto px-5">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">24*7 Fresh Store</h3>
            <p className="text-gray-300">Fresh vegetables and fruits delivered daily to your doorstep.</p>
            <div className="mt-4">
              <div className="flex items-center space-x-2">
                <FaMapMarkerAlt className="text-white text-lg" />
                <p className="text-gray-300">6W7H+WC, Sankha, Jharkhand 815313</p>
              </div>
              <div className="flex items-center space-x-2 mt-2">
                <span className="text-white">📞</span>
                <p className="text-gray-300">+91 6201640686</p>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-300 hover:text-white transition">Home</a></li>
              <li><a href="/vegetables" className="text-gray-300 hover:text-white transition">Vegetables</a></li>
              <li><a href="/fruits" className="text-gray-300 hover:text-white transition">Fruits</a></li>
              <li><a href="/today-prices" className="text-gray-300 hover:text-white transition">Today's Prices</a></li>
              <li><a href="/contact" className="text-gray-300 hover:text-white transition">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Business Hours</h3>
            <p className="text-gray-300">Monday - Sunday: 6:00 AM - 10:00 PM</p>
            <p className="text-gray-300 mt-2">24/7 Delivery Available</p>
            <div className="mt-4 flex space-x-4">
              <a href="tel:+916201640686" className="text-gray-300 hover:text-white transition">
                📞 Call Now
              </a>
              <a href="https://wa.me/916201640686" className="text-gray-300 hover:text-white transition">
                💬 WhatsApp
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Follow Us</h3>
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
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400">© 2024 24*7 Fresh Store. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSimple;
